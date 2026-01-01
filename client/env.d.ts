declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_EMAIL: string;
    GOOGLE_PRIVATE_KEY: string;
    GOOGLE_SHEET_ID: string;
  }
}