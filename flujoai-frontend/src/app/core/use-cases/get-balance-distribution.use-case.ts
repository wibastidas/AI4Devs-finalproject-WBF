import { environment } from '@env/environment';
import { BalanceDistributionResponse } from '@interfaces/dashboard.response';

export const getBalanceDistributionUseCase = async (): Promise<BalanceDistributionResponse> => {
  try {
    console.log('🚀 Iniciando getBalanceDistributionUseCase');
    
    const resp = await fetch(`${environment.backendApi}/dashboard/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await resp.json();
    console.log('📊 Respuesta del servidor:', data);

    if (!resp.ok) {
      console.error('❌ Error del servidor:', data);
      throw new Error(data.error || 'No se pudo obtener la distribución del balance');
    }

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