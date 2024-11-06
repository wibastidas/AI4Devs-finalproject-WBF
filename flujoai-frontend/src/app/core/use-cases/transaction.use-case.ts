import { TransactionResponse } from '@interfaces/transaction.response';
import { Transaction } from '@interfaces/transaction.interface';
import { environment } from '@env/environment';

export const getAllTransactionsUseCase = async (): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudieron obtener las transacciones');
    const transactions = await resp.json();
    return { ok: true, transactions };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudieron obtener las transacciones' };
  }
};

export const getTransactionByIdUseCase = async (id: string): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transaction/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

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

export const createTransactionUseCase = async (transactionData: {
  amount: number;
  date: string;
  type: 'income' | 'expense';
  account_id: number;
  category_id: number;
  description: string;
}): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

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
  transactionData: Partial<Transaction>
): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transaction/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

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

export const deleteTransactionUseCase = async (id: string): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transaction/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

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
