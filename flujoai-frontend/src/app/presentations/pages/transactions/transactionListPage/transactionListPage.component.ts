import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/interfaces/transaction.interface';
import { TransactionService } from '@app/presentations/services/transaction.service';
import { DialogService } from '@app/presentations/services/dialog.service';

@Component({
    selector: 'app-transaction-list-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './transactionListPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListPageComponent {
    private router = inject(Router);
    private transactionService = inject(TransactionService);
    private dialogService = inject(DialogService);

    public transactions = signal<Transaction[]>([]);
    public isLoading = signal(true);
    public error = signal<string | null>(null);

    constructor() {
        this.loadTransactions();
    }

    private loadTransactions(): void {
        this.transactionService.getAllTransactions()
            .subscribe({
                next: (response) => {
                    if (response.ok && Array.isArray(response.transactions)) {
                        this.transactions.set(response.transactions);
                        this.error.set(null);
                    } else {
                        this.error.set(response.error || 'Error al cargar las transacciones');
                        this.transactions.set([]);
                    }
                    this.isLoading.set(false);
                },
                error: (error) => {
                    console.error('Error al obtener las transacciones:', error);
                    this.error.set('Error al cargar las transacciones');
                    this.transactions.set([]);
                    this.isLoading.set(false);
                }
            });
    }

    createTransaction(): void {
        this.router.navigate(['/transactions/create']);
    }

    editTransaction(transaction: Transaction): void {
        this.router.navigate(['transactions/edit', transaction.id], {
            state: { transaction }
        });
    }

    viewTransaction(id: number): void {
        this.router.navigate(['/transactions', id]);
    }

    async deleteTransaction(transaction: Transaction): Promise<void> {
        const confirmed = await this.dialogService.confirm({
            title: 'Eliminar transacción',
            message: `¿Estás seguro que deseas eliminar la transacción por "${transaction.amount}"?`,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            color: 'red',
            icon: 'fas fa-trash'
        });

        if (confirmed) {
            this.transactionService.deleteTransaction(transaction.id.toString()).subscribe({
                next: (response) => {
                    if (response.ok) {
                        this.loadTransactions();
                    } else {
                        this.error.set(response.error || 'Error al eliminar la transacción');
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar la transacción:', error);
                    this.error.set('Error al eliminar la transacción');
                }
            });
        }
    }
}
