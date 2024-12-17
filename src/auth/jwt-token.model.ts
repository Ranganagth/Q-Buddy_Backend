export interface JwtToken {
    sub: string; // User ID
    email: string; // User email
    iat: number; // Issued At Timestamp
    exp: number; // Expiration Timestamp
  }
  