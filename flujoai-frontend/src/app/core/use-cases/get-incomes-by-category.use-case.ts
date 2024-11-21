import { environment } from '@env/environment';
import { CategoryDistributionResponse } from '@interfaces/dashboard.response';
import { DateRangeParams } from '@app/interfaces/dashboard.interface';
import { apiRequest } from '../helpers/api.helper';

type GetTokenFn = () => string | null;

export const getIncomesByCategoryUseCase = async (
  params: DateRangeParams,
  getToken: GetTokenFn
): Promise<CategoryDistributionResponse> => {
  try {
    const resp = await apiRequest(
      `/dashboard/income-by-category?startDate=${params.startDate}&endDate=${params.endDate}`,
      {},
      getToken
    );
    
    if (!resp.ok) throw new Error('No se pudieron obtener los ingresos por categoría');
    
    const data = await resp.json();
    return {
      ok: true,
      distribution: data.incomesByCategory
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      ok: false,
      error: 'No se pudieron obtener los ingresos por categoría'
    };
  }
};