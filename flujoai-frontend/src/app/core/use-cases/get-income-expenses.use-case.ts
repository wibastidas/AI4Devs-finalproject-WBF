import { environment } from '@env/environment';
import { IncomeExpensesSummaryResponse } from '@interfaces/dashboard.response';
import { DateRangeParams } from '@app/interfaces/dashboard.interface';

export const getIncomeExpensesByDateUseCase = async (
  params: DateRangeParams
): Promise<IncomeExpensesSummaryResponse> => {
  try {
    const resp = await fetch(
      `${environment.backendApi}/dashboard/income-expenses?startDate=${params.startDate}&endDate=${params.endDate}`,
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
      summary: data.summary,
      analysis: data.analysis
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener los ingresos y gastos',
      summary: {
        monthlyIncome: 0,
        monthlyExpenses: 0
      }
    };
  }
};