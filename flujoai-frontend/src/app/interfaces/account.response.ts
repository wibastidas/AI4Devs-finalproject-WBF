import { Account } from './account.interface';

export interface AccountResponse {
  ok: boolean;
  error?: string;
  account?: Account;
  accounts?: Account[];
}
