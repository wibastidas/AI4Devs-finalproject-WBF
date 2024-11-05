import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor() {}

  // Obtener todas las categorías
  getAllCategories() {
    // TODO: Implementar llamada al caso de uso
  }

  // Obtener una categoría por ID
  getCategoryById(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Crear nueva categoría
  createCategory(category: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Actualizar categoría existente
  updateCategory(id: string, category: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Eliminar categoría
  deleteCategory(id: string) {
    // TODO: Implementar llamada al caso de uso
  }
}