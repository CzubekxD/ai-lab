export type NotatnikRev = number

declare module 'claude-code' {
  interface PluginState {
    notatnik: { rev: NotatnikRev }
  }
}
