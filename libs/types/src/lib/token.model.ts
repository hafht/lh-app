// export interface UserToken {
//   idToken: string;
//   accessToken: string;
//   accessTokenExpiredIn: number;
//   refreshToken: string;
//   refreshTokenExpiredIn: number;
// }

import {TokenSet} from "openid-client";

export type UserToken = TokenSet
