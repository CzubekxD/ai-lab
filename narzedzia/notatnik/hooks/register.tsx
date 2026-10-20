import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

const PANE = 'notatnik'
const TITLE = 'Notatnik ai-lab'
const REPO = '/home/claude/ai-lab'
const STAN = `${REPO}/STAN.md`
const NOTATKI = `${REPO}/NOTATKI.md`
const NOTATKI_HEAD = '# Notatki\n\nWpisy z notatnika w panelu bocznym, najnowsze na dole.\n'
const SHOWN_NOTES = 8

// Bumped whenever either file changes; every drawing reads it, so a bump redraws the pane.
const rev = atom({ plugin: 'notatnik', key: 'rev' } as const, 0)

type Item = { line: number; isDone: boolean; text: string }

const readText = ($: EngineInterface, path: string) =>
  $.fs.read(path).then(
    text => text,
    () => '',
  )

// Lines of one `## Heading` section, up to the next `## `.
const section = (text: string, heading: string): string[] => {
  const lines = text.split('\n')
  const start = lines.findIndex(line => line.trim() === `## ${heading}`)
  if (start < 0) return []
  const rest = lines.slice(start + 1)
  const end = rest.findIndex(line => line.startsWith('## '))

  return end < 0 ? rest : rest.slice(0, end)
}

const checklist = (text: string, heading: string): Item[] => {
  const lines = text.split('\n')
  const start = lines.findIndex(line => line.trim() === `## ${heading}`)
  if (start < 0) return []
  const items: Item[] = []
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i] ?? ''
    if (line.startsWith('## ')) break
    const match = /^- \[( |x)\] (.*)$/.exec(line)
    if (match) items.push({ line: i, isDone: match[1] === 'x', text: match[2] ?? '' })
  }

  return items
}

const stamp = () => {
  try {
    return new Date().toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
}

const plain = (markdown: string) => markdown.replace(/\*\*/g, '').replace(/`/g, '')

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'notatnik',
      description: 'Otwiera notatnik ai-lab w panelu bocznym',
    })
    void $.ui.open({ id: PANE, title: TITLE })

    // Redraw when STAN.md or NOTATKI.md change on disk (edits made in the chat, a git pull).
    let seen = ''
    $.clock.every(3000, async () => {
      const stats = await Promise.all(
        [STAN, NOTATKI].map(path =>
          $.fs.stat(path).then(
            s => `${s.mtimeMs}:${s.size}`,
            () => 'none',
          ),
        ),
      )
      const now = stats.join('|')
      if (now !== seen) {
        seen = now
        await update($, rev, n => n + 1)
      }
    })

    return next(e)
  })

  on('command.run', { command: 'notatnik' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })

    return { text: 'Notatnik otwarty.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const ui = $.ui.resolve(e)
    const { Box, Text, Button, Markdown } = ui
    await read($, rev)

    const stan = await readText($, STAN)
    const notes = await readText($, NOTATKI)

    const items = checklist(stan, 'Teraz')
    const intro = section(stan, 'Teraz')
      .filter(line => line.trim() !== '' && !/^- \[( |x)\] /.test(line))
      .join('\n')
    const decisions = section(stan, 'Otwarte decyzje').join('\n').trim()
    const entries = notes.split('\n').filter(line => line.startsWith('- '))

    const toggle = async (item: Item) => {
      const lines = (await readText($, STAN)).split('\n')
      const line = lines[item.line]
      if (line === undefined || !line.endsWith(item.text)) return
      lines[item.line] = line.replace(/^- \[( |x)\]/, item.isDone ? '- [ ]' : '- [x]')
      await $.fs.write(STAN, lines.join('\n'))
      await update($, rev, n => n + 1)
    }

    const addNote = async (value: string) => {
      const text = value.trim().replace(/\n+/g, ' ')
      if (text === '') return
      const before = await readText($, NOTATKI)
      const base = before === '' ? NOTATKI_HEAD : before.replace(/\n*$/, '\n')
      await $.fs.write(NOTATKI, `${base}- ${stamp()} — ${text}\n`)
      await update($, rev, n => n + 1)
    }

    return (
      <Box flexDirection="column" gap={1}>
        {stan === '' && <Text dimColor>Brak pliku {STAN}.</Text>}

        <Box flexDirection="column">
          <Text bold>Teraz</Text>
          {intro !== '' && <Markdown text={intro} dimColor />}
          {items.map(item => (
            <Button key={`item-${item.line}`} plain onPress={() => toggle(item)}>
              {item.isDone ? '[x] ' : '[ ] '}
              <Text dimColor={item.isDone}>{plain(item.text)}</Text>
            </Button>
          ))}
        </Box>

        {decisions !== '' && (
          <Box flexDirection="column">
            <Text bold>Otwarte decyzje</Text>
            <Markdown text={decisions} />
          </Box>
        )}

        <Box flexDirection="column">
          <Text bold>Notatki</Text>
          {'Input' in ui && e.surface !== 'mobile' && (
            <ui.Input
              key="nowa-notatka"
              placeholder="przewidywanie, wynik, pytanie… Enter zapisuje"
              submitLabel="zapisz"
              rows={2}
              onSubmit={value => addNote(value)}
            />
          )}
          {entries.length === 0 ? (
            <Text dimColor>Jeszcze nic. Wpisy trafiają do NOTATKI.md w repo.</Text>
          ) : (
            <Markdown text={entries.slice(-SHOWN_NOTES).join('\n')} dimColor />
          )}
        </Box>
      </Box>
    )
  })
}
