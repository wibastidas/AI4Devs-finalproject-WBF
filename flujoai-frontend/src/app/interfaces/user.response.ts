import { User } from './user.interface';

export interface UserResponse {
  ok: boolean;
  users?: User[];
  user?: User;
  error?: string;
}
