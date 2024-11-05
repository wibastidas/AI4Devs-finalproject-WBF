import { Transaction } from './transaction.interface';

export interface TransactionResponse {
  ok: boolean;
  transactions?: Transaction[];
  transaction?: Transaction;
  error?: string;
}
