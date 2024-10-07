export interface UserToken {
  idToken: string;
  accessToken: string;
  accessTokenExpiredIn: number;
  refreshToken: string;
  refreshTokenExpiredIn: number;
}
