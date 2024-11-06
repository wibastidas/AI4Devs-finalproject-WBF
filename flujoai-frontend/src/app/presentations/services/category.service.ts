import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllCategoriesUseCase,
  getCategoryByIdUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase 
} from '@use-cases/index';


@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor() {}

  // Obtener todas las categorías
  getAllCategories() {
    return from(getAllCategoriesUseCase());
  }

  // Obtener una categoría por ID
  getCategoryById(id: string) {
    return from(getCategoryByIdUseCase(id));
  }

  // Crear nueva categoría
  createCategory(category: any) {
    return from(createCategoryUseCase(category));
  }

  // Actualizar categoría existente
  updateCategory(id: string, category: any) {
    return from(updateCategoryUseCase(id, category));
  }

  // Eliminar categoría
  deleteCategory(id: number) {
    return from(deleteCategoryUseCase(id));
  }
}