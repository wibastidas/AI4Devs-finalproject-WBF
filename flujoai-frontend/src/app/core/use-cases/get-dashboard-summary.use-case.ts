import { DateRangeParams } from '@app/interfaces/dashboard.interface';
import { environment } from '@env/environment';
import { DashboardSummaryResponse } from '@interfaces/dashboard.response';

export const getDashboardSummaryUseCase = async (
  params: DateRangeParams
): Promise<DashboardSummaryResponse> => {
  try {
    const resp = await fetch(
      `${environment.backendApi}/dashboard/summary?startDate=${params.startDate}&endDate=${params.endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.error || 'No se pudo obtener el resumen del dashboard');
    }

    return {
      ok: true,
      summary: {
        totalBalance: data.summary.totalBalance || 0,
        monthlyIncome: data.summary.monthlyIncome || 0,
        monthlyExpenses: data.summary.monthlyExpenses || 0
      }
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'No se pudo obtener el resumen del dashboard'
    };
  }
};