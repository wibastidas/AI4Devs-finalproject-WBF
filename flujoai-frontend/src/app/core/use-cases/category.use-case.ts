import { CategoryResponse } from '@app/interfaces/category.response';
import { Category } from '@app/interfaces/category.interface';

import { environment } from '@env/environment';

// Casos de uso
export const getAllCategoriesUseCase = async (): Promise<CategoryResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudieron obtener las categorías');

    const categories = await resp.json();

    return {
      ok: true,
      categories
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener las categorías'
    };
  }
};

export const getCategoryByIdUseCase = async (id: string): Promise<CategoryResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudo obtener la categoría');

    const category = await resp.json();

    return {
      ok: true,
      category
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo obtener la categoría'
    };
  }
};

export const createCategoryUseCase = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<CategoryResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    });

    if (!resp.ok) throw new Error('No se pudo crear la categoría');

    const newCategory = await resp.json();

    return {
      ok: true,
      category: newCategory
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo crear la categoría'
    };
  }
};

export const updateCategoryUseCase = async (id: string, category: Partial<Category>): Promise<CategoryResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    });

    if (!resp.ok) throw new Error('No se pudo actualizar la categoría');

    const updatedCategory = await resp.json();

    return {
      ok: true,
      category: updatedCategory
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo actualizar la categoría'
    };
  }
};

export const deleteCategoryUseCase = async (id: string): Promise<CategoryResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudo eliminar la categoría');

    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo eliminar la categoría'
    };
  }
};
