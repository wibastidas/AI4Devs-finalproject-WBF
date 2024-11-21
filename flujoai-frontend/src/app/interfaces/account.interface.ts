export interface Account {
  id: number;
  name: string;
  description: string;
  business_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAccountDTO {
  name: string;
  description: string;
  business_id: number;
}
