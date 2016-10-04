export interface ICaptcha {
  ID: string;
  Base64: string;
  data?: string; // whole url data, use Base64 if not present
}
