export interface JwtToken {
    userId: any;
    sub: string; // User ID
    email: string; // User email
    iat: number; // Issued At Timestamp
    exp: number; // Expiration Timestamp
  }
  