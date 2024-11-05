import { Category } from './category.interface';

export interface CategoryResponse {
    ok: boolean;
    category?: Category;
    categories?: Category[];
    error?: string;
}