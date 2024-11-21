import { TransactionResponse } from '@interfaces/transaction.response';
import { Transaction, TransactionFilters } from '@interfaces/transaction.interface';
import { environment } from '@env/environment';
import { apiRequest } from '../helpers/api.helper';

type GetTokenFn = () => string | null;

export const getAllTransactionsUseCase = async (
  filters: TransactionFilters,
  getToken: GetTokenFn
): Promise<TransactionResponse> => {
  try {
    let url = '/transactions';
    
    if (filters?.startDate || filters?.endDate) {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      url += `?${params.toString()}`;
    }

    const resp = await apiRequest(url, {}, getToken);

    if (!resp.ok) throw new Error('No se pudieron obtener las transacciones');
    const data = await resp.json();
    return { ok: true, transactions: data.transactions };
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    return { ok: false, error: 'No se pudieron obtener las transacciones' };
  }
};

export const getTransactionByIdUseCase = async (id: string, getToken: GetTokenFn): Promise<TransactionResponse> => {
  try {
    const resp = await apiRequest(`/transactions/${id}`, {}, getToken);

    if (!resp.ok) {
      const data = await resp.json();
      return { ok: false, error: data.message || 'No se pudo obtener la transacción' };
    }
    const transaction = await resp.json();
    return { ok: true, transaction };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo obtener la transacción' };
  }
};

export const createTransactionUseCase = async (
  transactionData: {
    amount: number;
    date: string;
    type: 'income' | 'expense';
    account_id: number;
    category_id: number;
    description: string;
  },
  getToken: GetTokenFn
): Promise<TransactionResponse> => {
  try {
    const resp = await apiRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    }, getToken);

    const data = await resp.json();
    
    if (!resp.ok) {
      return { ok: false, error: data.message || 'No se pudo crear la transacción' };
    }

    return { ok: true, transaction: data };
  } catch (error) {
    console.error('Error al crear transacción:', error);
    return { ok: false, error: 'No se pudo crear la transacción' };
  }
};

export const updateTransactionUseCase = async (
  id: string,
  transactionData: Partial<Transaction>,
  getToken: GetTokenFn
): Promise<TransactionResponse> => {
  try {
    const resp = await apiRequest(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData)
    }, getToken);

    const data = await resp.json();

    if (!resp.ok) {
      return { ok: false, error: data.message || 'No se pudo actualizar la transacción' };
    }

    return { ok: true, transaction: data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo actualizar la transacción' };
  }
};

export const deleteTransactionUseCase = async (
  id: string,
  getToken: GetTokenFn
): Promise<TransactionResponse> => {
  try {
    const resp = await apiRequest(`/transactions/${id}`, {
      method: 'DELETE'
    }, getToken);

    if (!resp.ok) {
      const data = await resp.json();
      return { ok: false, error: data.message || 'No se pudo eliminar la transacción' };
    }

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo eliminar la transacción' };
  }
};
