import { TransactionResponse } from '@app/interfaces/transaction.response';
import { Transaction } from '@app/interfaces/transaction.interface';
import { environment } from '@env/environment';

export const getAllTransactionsUseCase = async (): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('Error al obtener las transacciones');
    const transactions = await resp.json();
    return { ok: true, transactions };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al obtener las transacciones' };
  }
};

export const getTransactionByIdUseCase = async (id: string): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Transacción no encontrada' };
      }
      throw new Error('Error al obtener la transacción');
    }
    const transaction = await resp.json();
    return { ok: true, transaction };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al obtener la transacción' };
  }
};

export const createTransactionUseCase = async (
  transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>
): Promise<TransactionResponse> => {
  try {
    if (transaction.amount <= 0) {
      return { ok: false, error: 'El monto debe ser mayor a 0' };
    }

    const resp = await fetch(`${environment.backendApi}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    });

    if (!resp.ok) throw new Error('Error al crear la transacción');
    const newTransaction = await resp.json();
    return { ok: true, transaction: newTransaction };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al crear la transacción' };
  }
};

export const updateTransactionUseCase = async (
  id: string,
  transaction: Partial<Transaction>
): Promise<TransactionResponse> => {
  try {
    if (transaction.amount && transaction.amount <= 0) {
      return { ok: false, error: 'El monto debe ser mayor a 0' };
    }

    const resp = await fetch(`${environment.backendApi}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Transacción no encontrada' };
      }
      throw new Error('Error al actualizar la transacción');
    }
    const updatedTransaction = await resp.json();
    return { ok: true, transaction: updatedTransaction };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al actualizar la transacción' };
  }
};

export const deleteTransactionUseCase = async (id: string): Promise<TransactionResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Transacción no encontrada' };
      }
      throw new Error('Error al eliminar la transacción');
    }
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al eliminar la transacción' };
  }
};
