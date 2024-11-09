export interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  account_id: number;
  category_id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
}

export interface TransactionResponse {
  ok: boolean;
  transactions?: Transaction[];
  transaction?: Transaction;
  error?: string;
}
