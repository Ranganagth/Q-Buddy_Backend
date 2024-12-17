import { JwtToken } from '../auth/jwt-token.model';

declare global {
  namespace Express {
    interface Request {
      user?: JwtToken;
    }
  }
}
