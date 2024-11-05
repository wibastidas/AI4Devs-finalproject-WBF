export interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  account_id: number;
  category_id: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}
