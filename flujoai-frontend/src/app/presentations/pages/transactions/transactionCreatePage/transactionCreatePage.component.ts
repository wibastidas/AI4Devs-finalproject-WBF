import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TransactionService } from '@app/presentations/services/transaction.service';
import { AccountService } from '@app/presentations/services/account.service';
import { CategoryService } from '@app/presentations/services/category.service';
import { Account } from '@app/interfaces/account.interface';
import { Category } from '@app/interfaces/category.interface';

@Component({
    selector: 'app-transaction-create-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './transactionCreatePage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionCreatePageComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private transactionService = inject(TransactionService);
    private accountService = inject(AccountService);
    private categoryService = inject(CategoryService);

    public accounts = signal<Account[]>([]);
    public categories = signal<Category[]>([]);
    public error = signal<string | null>(null);
    public isLoading = signal(false);

    public transactionForm: FormGroup = this.fb.group({
        amount: ['', [Validators.required, Validators.min(0)]],
        date: ['', Validators.required],
        type: ['income', Validators.required],
        account_id: ['', Validators.required],
        category_id: ['', Validators.required],
        description: ['', Validators.required]
    });

    constructor() {
        this.loadAccounts();
        this.loadCategories();
    }

    private loadAccounts(): void {
        this.accountService.getAllAccounts().subscribe({
            next: (response) => {
                if (response.ok && Array.isArray(response.accounts)) {
                    this.accounts.set(response.accounts);
                }
            },
            error: (error) => console.error('Error al cargar cuentas:', error)
        });
    }

    private loadCategories(): void {
        this.categoryService.getAllCategories().subscribe({
            next: (response) => {
                if (response.ok && Array.isArray(response.categories)) {
                    this.categories.set(response.categories);
                }
            },
            error: (error) => console.error('Error al cargar categorías:', error)
        });
    }

    onSubmit(): void {
        if (this.transactionForm.valid) {
            this.isLoading.set(true);
            this.error.set(null);

            this.transactionService.createTransaction(this.transactionForm.value)
                .subscribe({
                    next: (response) => {
                        if (response.ok) {
                            this.router.navigate(['/transactions']);
                        } else {
                            this.error.set(response.error || 'Error al crear la transacción');
                        }
                        this.isLoading.set(false);
                    },
                    error: (error) => {
                        console.error('Error al crear la transacción:', error);
                        this.error.set('Error al crear la transacción');
                        this.isLoading.set(false);
                    }
                });
        }
    }

    goBack(): void {
        this.router.navigate(['/transactions']);
    }
}