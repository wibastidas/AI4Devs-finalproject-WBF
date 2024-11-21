import { environment } from '@env/environment';
import { IncomeExpensesSummaryResponse } from '@interfaces/dashboard.response';
import { DateRangeParams } from '@app/interfaces/dashboard.interface';
import { apiRequest } from '../helpers/api.helper';

type GetTokenFn = () => string | null;

export const getIncomeExpensesByDateUseCase = async (
  params: DateRangeParams,
  getToken: GetTokenFn
): Promise<IncomeExpensesSummaryResponse> => {
  try {
    const resp = await apiRequest(
      `/dashboard/income-expenses?startDate=${params.startDate}&endDate=${params.endDate}`,
      {},
      getToken
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