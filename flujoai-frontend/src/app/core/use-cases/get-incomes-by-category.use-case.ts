import { environment } from '@env/environment';
import { CategoryDistributionResponse } from '@interfaces/dashboard.response';

export const getIncomesByCategoryUseCase = async (): Promise<CategoryDistributionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/dashboard/income-by-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudieron obtener los ingresos por categoría');

    const data = await resp.json();

    return {
      ok: true,
      distribution: data.incomesByCategory
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener los ingresos por categoría'
    };
  }
};