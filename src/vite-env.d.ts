/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_PORT: number
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
