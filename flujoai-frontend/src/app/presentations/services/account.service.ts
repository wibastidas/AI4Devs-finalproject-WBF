import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AccountService {
  constructor() {}

  // Obtener todas las cuentas
  getAllAccounts() {
    // TODO: Implementar llamada al caso de uso
  }

  // Obtener una cuenta por ID
  getAccountById(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Crear nueva cuenta
  createAccount(account: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Actualizar cuenta existente
  updateAccount(id: string, account: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Eliminar cuenta
  deleteAccount(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Métodos adicionales específicos para cuentas
  getAccountBalance(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  transferFunds(fromId: string, toId: string, amount: number) {
    // TODO: Implementar llamada al caso de uso
  }
}
