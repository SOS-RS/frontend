/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_PORT: number
  readonly VITE_HOTJAR_SITE_ID: number
  readonly VITE_HOTJAR_VERSION: number
  readonly VITE_HOTJAR_DEBUG: boolean
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
