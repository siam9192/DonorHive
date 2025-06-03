// types/express.d.ts
import { IUser } from '../interfaces/user.interface'; // adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user: IUser; // Add your custom field here
    }
  }
}
