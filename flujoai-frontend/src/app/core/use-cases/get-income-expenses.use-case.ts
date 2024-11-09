import { environment } from '@env/environment';
import { IncomeExpensesSummaryResponse } from '@interfaces/dashboard.response';

export const getIncomeExpensesByDateUseCase = async (
  params: { startDate: string; endDate: string }
): Promise<IncomeExpensesSummaryResponse> => {
  try {
    const resp = await fetch(
      `${environment.backendApi}/dashboard/transactions?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!resp.ok) throw new Error('No se pudieron obtener los ingresos y gastos');

    const data = await resp.json();

    return {
      ok: true,
      summary: {
        totalIncome: data.totalIncome,
        totalExpenses: data.totalExpenses
      }
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener los ingresos y gastos'
    };
  }
};