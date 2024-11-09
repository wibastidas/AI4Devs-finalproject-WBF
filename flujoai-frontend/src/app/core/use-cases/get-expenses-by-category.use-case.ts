import { environment } from '@env/environment';
import { CategoryDistributionResponse } from '@interfaces/dashboard.response';
import { DateRangeParams } from '@app/interfaces/dashboard.interface';

export const getExpensesByCategoryUseCase = async (
  params: DateRangeParams
): Promise<CategoryDistributionResponse> => {
  try {
    const resp = await fetch(
      `${environment.backendApi}/dashboard/expenses-by-category?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!resp.ok) throw new Error('No se pudieron obtener los gastos por categoría');

    const data = await resp.json();

    return {
      ok: true,
      distribution: data.expensesByCategory
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener los gastos por categoría'
    };
  }
};