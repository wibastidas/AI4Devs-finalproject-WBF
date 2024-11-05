import { Account } from './account.interface';

export interface AccountResponse {
  ok: boolean;
  accounts?: Account[];
  account?: Account;
  error?: string;
}
