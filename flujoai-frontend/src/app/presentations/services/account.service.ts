import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AccountResponse } from '@interfaces/account.response';
import { Account, CreateAccountDTO } from '@interfaces/account.interface';
import { 
  getAllAccountsUseCase,
  getAccountByIdUseCase,
  createAccountUseCase,
  updateAccountUseCase,
  deleteAccountUseCase 
} from '@use-cases/index';
import { AuthService } from './AuthService.service';

@Injectable({providedIn: 'root'})
export class AccountService {
  constructor(private authService: AuthService) {}

  getAllAccounts(): Observable<AccountResponse> {
    const getToken = () => this.authService.getToken();
    return from(getAllAccountsUseCase(getToken));
  }

  getAccountById(id: string): Observable<AccountResponse> {
    const getToken = () => this.authService.getToken();
    return from(getAccountByIdUseCase(id, getToken));
  }

  createAccount(account: CreateAccountDTO): Observable<AccountResponse> {
    return from(createAccountUseCase(account, () => this.authService.getToken()));
  }

  updateAccount(id: string, account: Partial<Account>): Observable<AccountResponse> {
    return from(updateAccountUseCase(id, account, () => this.authService.getToken()));
  }

  deleteAccount(id: number): Observable<AccountResponse> {
    return from(deleteAccountUseCase(id, () => this.authService.getToken()));
  }
}
