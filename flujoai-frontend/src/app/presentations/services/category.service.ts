import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllCategoriesUseCase,
  getCategoryByIdUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase 
} from '@use-cases/index';
import { AuthService } from './AuthService.service';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private authService: AuthService) {}

  // Obtener todas las categorías
  getAllCategories() {
    const getToken = () => this.authService.getToken();
    return from(getAllCategoriesUseCase(getToken));
  }

  // Obtener una categoría por ID
  getCategoryById(id: string) {
    const getToken = () => this.authService.getToken();
    return from(getCategoryByIdUseCase(id, getToken));
  }

  // Crear nueva categoría
  createCategory(category: any) {
    const getToken = () => this.authService.getToken();
    return from(createCategoryUseCase(category, getToken));
  }

  // Actualizar categoría existente
  updateCategory(id: string, category: any) {
    const getToken = () => this.authService.getToken();
    return from(updateCategoryUseCase(id, category, getToken));
  }

  // Eliminar categoría
  deleteCategory(id: number) {
    const getToken = () => this.authService.getToken();
    return from(deleteCategoryUseCase(id, getToken));
  }
}