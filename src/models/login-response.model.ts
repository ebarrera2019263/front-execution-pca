export interface LoginResponse {
  token: string;
  username: string;
  requires2FA: boolean;
}
