import { Category } from './category.interface';

export interface CategoryResponse {
    ok: boolean;
    error?: string;
    category?: Category;
    categories?: Category[];
}