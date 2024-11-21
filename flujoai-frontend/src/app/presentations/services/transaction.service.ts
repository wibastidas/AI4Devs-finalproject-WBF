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
import { AuthService } from './AuthService.service';

@Injectable({providedIn: 'root'})
export class TransactionService {
  constructor(private authService: AuthService) {}

  // Obtener transacciones con filtros
  getTransactions(filters: TransactionFilters) {
    const getToken = () => this.authService.getToken();
    return from<Promise<TransactionResponse>>(getAllTransactionsUseCase(filters, getToken));
  }

  // Obtener una transacción por ID
  getTransactionById(id: string) {
    const getToken = () => this.authService.getToken();
    return from<Promise<TransactionResponse>>(getTransactionByIdUseCase(id, getToken));
  }

  // Crear nueva transacción
  createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) {
    const getToken = () => this.authService.getToken();
    return from<Promise<TransactionResponse>>(createTransactionUseCase(transaction, getToken));
  }

  // Actualizar transacción existente
  updateTransaction(id: string, transaction: Partial<Transaction>) {
    const getToken = () => this.authService.getToken();
    return from<Promise<TransactionResponse>>(updateTransactionUseCase(id, transaction, getToken));
  }

  // Eliminar transacción
  deleteTransaction(id: string) {
    const getToken = () => this.authService.getToken();
    return from<Promise<TransactionResponse>>(deleteTransactionUseCase(id, getToken));
  }
}
