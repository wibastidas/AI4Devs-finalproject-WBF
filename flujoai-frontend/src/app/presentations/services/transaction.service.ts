import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllTransactionsUseCase,
  getTransactionByIdUseCase,
  createTransactionUseCase,
  updateTransactionUseCase,
  deleteTransactionUseCase 
} from '@use-cases/index';
import { Transaction, TransactionFilters, TransactionResponse } from '@interfaces/transaction.interface';

@Injectable({providedIn: 'root'})
export class TransactionService {
  constructor() {}

  // Obtener transacciones con filtros
  getTransactions(filters: TransactionFilters) {
    return from<Promise<TransactionResponse>>(getAllTransactionsUseCase(filters));
  }

  // Obtener una transacción por ID
  getTransactionById(id: string) {
    return from<Promise<TransactionResponse>>(getTransactionByIdUseCase(id));
  }

  // Crear nueva transacción
  createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) {
    return from<Promise<TransactionResponse>>(createTransactionUseCase(transaction));
  }

  // Actualizar transacción existente
  updateTransaction(id: string, transaction: Partial<Transaction>) {
    return from<Promise<TransactionResponse>>(updateTransactionUseCase(id, transaction));
  }

  // Eliminar transacción
  deleteTransaction(id: string) {
    return from<Promise<TransactionResponse>>(deleteTransactionUseCase(id));
  }
}
