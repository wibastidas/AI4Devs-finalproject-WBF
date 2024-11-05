import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {
  constructor() {}

  // Obtener todas las transacciones
  getAllTransactions() {
    // TODO: Implementar llamada al caso de uso
  }

  // Obtener una transacción por ID
  getTransactionById(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Crear nueva transacción
  createTransaction(transaction: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Actualizar transacción existente
  updateTransaction(id: string, transaction: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Eliminar transacción
  deleteTransaction(id: string) {
    // TODO: Implementar llamada al caso de uso
  }
}
