import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllAccountsUseCase,
  getAccountByIdUseCase,
  createAccountUseCase,
  updateAccountUseCase,
  deleteAccountUseCase 
} from '@use-cases/index';

@Injectable({providedIn: 'root'})
export class AccountService {
  constructor() {}

  // Obtener todas las cuentas
  getAllAccounts() {
    return from(getAllAccountsUseCase());
  }

  // Obtener una cuenta por ID
  getAccountById(id: string) {
    return from(getAccountByIdUseCase(id));
  }

  // Crear nueva cuenta
  createAccount(account: {
    name: string;
    description: string;
    business_id: number;
  }) {
    return from(createAccountUseCase(account));
  }

  // Actualizar cuenta existente
  updateAccount(id: string, account: any) {
    return from(updateAccountUseCase(id, account));
  }

  // Eliminar cuenta
  deleteAccount(id: number) {
    return from(deleteAccountUseCase(id));
  }
}
