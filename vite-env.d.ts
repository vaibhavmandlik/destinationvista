/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Add your environment variables here
  readonly VITE_API_KEY: string; // Example: Add all used variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

