import jwt_decode from "jwt-decode";

export function decodeJwt<T>(token: string) {
  return jwt_decode(token) as T;
}
