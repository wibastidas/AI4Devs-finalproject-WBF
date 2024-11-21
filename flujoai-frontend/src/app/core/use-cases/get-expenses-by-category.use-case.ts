import { environment } from '@env/environment';
import { CategoryDistributionResponse } from '@interfaces/dashboard.response';
import { DateRangeParams } from '@app/interfaces/dashboard.interface';
import { apiRequest } from '../helpers/api.helper';

type GetTokenFn = () => string | null;

export const getExpensesByCategoryUseCase = async (
  params: DateRangeParams,
  getToken: GetTokenFn
): Promise<CategoryDistributionResponse> => {
  try {
    const resp = await apiRequest(
      `/dashboard/expenses-by-category?startDate=${params.startDate}&endDate=${params.endDate}`,
      {},
      getToken
    );
    
    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.message || 'Error al obtener los gastos por categoría');
    }
    
    const data = await resp.json();
    return {
      ok: true,
      distribution: data.expensesByCategory
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      ok: false,
      error: 'No se pudieron obtener los gastos por categoría'
    };
  }
};