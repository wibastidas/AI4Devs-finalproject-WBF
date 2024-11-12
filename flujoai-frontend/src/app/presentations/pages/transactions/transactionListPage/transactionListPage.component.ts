import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/interfaces/transaction.interface';
import { TransactionService } from '@app/presentations/services/transaction.service';
import { DialogService } from '@app/presentations/services/dialog.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-transaction-list-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
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
    public startDate = signal<string>(this.getDefaultStartDate());
    public endDate = signal<string>(this.getDefaultEndDate());

    constructor() {
        this.loadTransactions();
    }

    private getDefaultStartDate(): string {
        const date = new Date();
        date.setDate(1);
        return date.toISOString().split('T')[0];
    }

    private getDefaultEndDate(): string {
        const today = new Date();
        const currentMonth = today.getMonth();
        const date = new Date();
        
        // Si estamos en el mes actual, usamos la fecha de hoy
        if (date.getMonth() === currentMonth) {
            return today.toISOString().split('T')[0];
        }
        
        // Si no, usamos el último día del mes
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDay.toISOString().split('T')[0];
    }

    onStartDateChange(event: Event): void {
        const newDate = (event.target as HTMLInputElement).value;
        console.log('Nueva fecha inicio:', newDate);
        this.startDate.set(newDate);
    }

    onEndDateChange(event: Event): void {
        const newDate = (event.target as HTMLInputElement).value;
        console.log('Nueva fecha fin:', newDate);
        this.endDate.set(newDate);
    }

    searchTransactions(): void {
        const start = this.startDate();
        const end = this.endDate();
        
        console.log('Fechas a buscar:', { start, end });
        
        if (this.isValidDateRange(start, end)) {
            this.loadTransactions();
        }
    }

    private isValidDateRange(start: string, end: string): boolean {
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            this.error.set('Formato de fecha inválido');
            return false;
        }

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 31) {
            this.error.set('El rango de fechas no puede ser mayor a 31 días');
            return false;
        }
        
        if (endDate < startDate) {
            this.error.set('La fecha final no puede ser menor a la fecha inicial');
            return false;
        }

        this.error.set(null);
        return true;
    }

    private loadTransactions(): void {
        this.isLoading.set(true);
        
        const params = {
            startDate: this.startDate(),
            endDate: this.endDate()
        };
        
        console.log('Parámetros enviados:', params);
        
        this.transactionService.getTransactions(params).subscribe({
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
