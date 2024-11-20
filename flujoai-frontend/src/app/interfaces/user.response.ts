import { User } from './user.interface';

export interface UserResponse {
  ok: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    username: string;
    business?: {
      id: number;
      name: string;
    }
  };
  users?: Array<{
    id: number;
    email: string;
    username: string;
    business?: {
      id: number;
      name: string;
    }
  }>;
  error?: string;
}
