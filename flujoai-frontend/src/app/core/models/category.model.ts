export interface Category {
  id: number;
  name: string;
  type: string; // 'income' or 'expense'
  description: string;
  created_at: Date;
  updated_at: Date;
}
