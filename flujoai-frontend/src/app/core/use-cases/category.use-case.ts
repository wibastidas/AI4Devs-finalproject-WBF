import { CategoryResponse } from '@app/interfaces/category.response';
import { Category } from '@app/interfaces/category.interface';
import { apiRequest } from '../helpers/api.helper';

import { environment } from '@env/environment';

type GetTokenFn = () => string | null;

// Casos de uso
export const getAllCategoriesUseCase = async (getToken: GetTokenFn): Promise<CategoryResponse> => {
  try {
    const resp = await apiRequest('/categories', {}, getToken);
    
    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.message || 'Error al obtener las categorías');
    }
    
    const data = await resp.json();
    return {
      ok: true,
      categories: data
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      ok: false,
      error: 'No se pudieron obtener las categorías'
    };
  }
};

export const getCategoryByIdUseCase = async (id: string, getToken: GetTokenFn): Promise<CategoryResponse> => {
  try {
    const resp = await apiRequest(`/categories/${id}`, {}, getToken);

    if (!resp.ok) throw new Error('No se pudo obtener la categoría');

    const data = await resp.json();
    return {
      ok: true,
      category: {
        id: data.id,
        name: data.name,
        description: data.description,
        business_id: data.business_id,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo obtener la categoría'
    };
  }
};

export const createCategoryUseCase = async (
  categoryData: {
    name: string;
    description: string;
    business_id: number;
  },
  getToken: GetTokenFn
): Promise<CategoryResponse> => {
  try {
    const resp = await apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    }, getToken);

    const data = await resp.json();
    
    if (!resp.ok) {
      throw new Error(data.message || 'No se pudo crear la categoría');
    }

    return {
      ok: true,
      category: data
    };
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return {
      ok: false,
      error: 'No se pudo crear la categoría'
    };
  }
};

export const updateCategoryUseCase = async (
  id: string, 
  category: Partial<Category>,
  getToken: GetTokenFn
): Promise<CategoryResponse> => {
  try {
    const resp = await apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category)
    }, getToken);

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

export const deleteCategoryUseCase = async (
  id: number,
  getToken: GetTokenFn
): Promise<CategoryResponse> => {
  try {
    const resp = await apiRequest(`/categories/${id}`, {
      method: 'DELETE'
    }, getToken);

    if (!resp.ok) throw new Error('No se pudo eliminar la categoría');
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo eliminar la categoría'
    };
  }
};
