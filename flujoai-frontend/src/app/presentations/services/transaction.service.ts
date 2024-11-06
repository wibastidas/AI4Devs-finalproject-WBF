import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllTransactionsUseCase,
  getTransactionByIdUseCase,
  createTransactionUseCase,
  updateTransactionUseCase,
  deleteTransactionUseCase 
} from '@use-cases/index';
import { Transaction } from '@interfaces/transaction.interface';

@Injectable({providedIn: 'root'})
export class TransactionService {
  constructor() {}

  // Obtener todas las transacciones
  getAllTransactions() {
    return from(getAllTransactionsUseCase());
  }

  // Obtener una transacción por ID
  getTransactionById(id: string) {
    return from(getTransactionByIdUseCase(id));
  }

  // Crear nueva transacción
  createTransaction(transaction: {
    amount: number;
    date: string;
    type: 'income' | 'expense';
    account_id: number;
    category_id: number;
    description: string;
  }) {
    return from(createTransactionUseCase(transaction));
  }

  // Actualizar transacción existente
  updateTransaction(id: string, transaction: Partial<Transaction>) {
    return from(updateTransactionUseCase(id, transaction));
  }

  // Eliminar transacción
  deleteTransaction(id: string) {
    return from(deleteTransactionUseCase(id));
  }
}
