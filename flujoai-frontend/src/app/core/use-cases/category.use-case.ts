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

export const getCategoryByIdUseCase = async (id: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudo obtener la categoría');

    const data = await resp.json() as Category;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo obtener la categoría'
    };
  }
};

export const createCategoryUseCase = async (categoryData: {
  name: string;
  description: string;
  business_id: number;
}) => {
  try {
    const response = await fetch(`${environment.backendApi}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: categoryData.name,
        description: categoryData.description,
        business_id: categoryData.business_id
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'No se pudo crear la categoría');
    }

    return data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
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

export const deleteCategoryUseCase = async (id: number): Promise<CategoryResponse> => {
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
