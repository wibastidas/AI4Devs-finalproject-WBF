import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '@app/interfaces/account.interface';
import { AccountService } from '@app/presentations/services/account.service';
import { DialogService } from '@app/presentations/services/dialog.service';

@Component({
  selector: 'app-account-list-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './accountListPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListPageComponent {
  private router = inject(Router);
  private accountService = inject(AccountService);
  private dialogService = inject(DialogService);

  public accounts = signal<Account[]>([]);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  constructor() {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.accountService.getAllAccounts()
      .subscribe({
        next: (response) => {
          if (response.ok && Array.isArray(response.accounts)) {
            this.accounts.set(response.accounts);
            this.error.set(null);
          } else {
            this.error.set(response.error || 'Error al cargar las cuentas');
            this.accounts.set([]);
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al obtener las cuentas:', error);
          this.error.set('Error al cargar las cuentas');
          this.accounts.set([]);
          this.isLoading.set(false);
        }
      });
  }

  createAccount(): void {
    this.router.navigate(['/accounts/create']);
  }

  editAccount(account: Account): void {
    this.router.navigate(['accounts/edit', account.id], {
      state: { account }
    });
  }

  viewAccount(id: number): void {
    this.router.navigate(['/accounts', id]);
  }

  async deleteAccount(account: Account): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Eliminar cuenta',
      message: `¿Estás seguro que deseas eliminar la cuenta "${account.name}"?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      color: 'red',
      icon: 'fas fa-trash'
    });

    if (confirmed) {
      this.accountService.deleteAccount(account.id).subscribe({
        next: (response) => {
          if (response.ok) {
            this.loadAccounts();
          } else {
            this.error.set(response.error || 'Error al eliminar la cuenta');
          }
        },
        error: (error) => {
          console.error('Error al eliminar la cuenta:', error);
          this.error.set('Error al eliminar la cuenta');
        }
      });
    }
  }
}
