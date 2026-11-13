/// <reference types="vite/client" />

// .env ke VITE_* variables yahan type karo — typo pakda jayega
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
