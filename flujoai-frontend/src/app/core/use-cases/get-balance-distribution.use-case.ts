import { environment } from '@env/environment';
import { BalanceDistributionResponse } from '@interfaces/dashboard.response';
import { apiRequest } from '../helpers/api.helper';

type GetTokenFn = () => string | null;

export const getBalanceDistributionUseCase = async (getToken: GetTokenFn): Promise<BalanceDistributionResponse> => {
  try {
    console.log('🚀 Iniciando getBalanceDistributionUseCase');
    
    const resp = await apiRequest('/dashboard/balance', {}, getToken);

    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.message || 'Error al obtener la distribución del balance');
    }

    const data = await resp.json();
    console.log('📊 Respuesta del servidor:', data);

    const response = {
      ok: true,
      balanceDistribution: {
        totalBalance: data.totalBalance || 0,
        distribution: data.distribution || []
      }
    };

    console.log('✅ Respuesta procesada:', response);
    return response;

  } catch (error) {
    console.error('❌ Error detallado:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'No se pudo obtener la distribución del balance'
    };
  }
};