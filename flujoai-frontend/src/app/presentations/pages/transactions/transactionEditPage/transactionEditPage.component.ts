import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TransactionService } from '@app/presentations/services/transaction.service';
import { AccountService } from '@app/presentations/services/account.service';
import { CategoryService } from '@app/presentations/services/category.service';
import { Account } from '@app/interfaces/account.interface';
import { Category } from '@app/interfaces/category.interface';

@Component({
    selector: 'app-transaction-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './transactionEditPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionEditPageComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
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
        this.loadTransaction();
    }

    private loadTransaction(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isLoading.set(true);
            this.transactionService.getTransactionById(id).subscribe({
                next: (response) => {
                    if (response.ok && response.transaction) {
                        const transaction = {
                            ...response.transaction,
                            date: new Date(response.transaction.date).toISOString().split('T')[0]
                        };
                        
                        transaction.account_id = transaction.account_id;
                        transaction.category_id = transaction.category_id;
                        
                        this.transactionForm.patchValue(transaction);
                    } else {
                        this.error.set('No se encontró la transacción');
                        this.router.navigate(['/transactions']);
                    }
                    this.isLoading.set(false);
                },
                error: (error) => {
                    console.error('Error al cargar la transacción:', error);
                    this.error.set('Error al cargar la transacción');
                    this.isLoading.set(false);
                    this.router.navigate(['/transactions']);
                }
            });
        }
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
            const id = this.route.snapshot.params['id'];
            
            this.transactionService.updateTransaction(id, this.transactionForm.value)
                .subscribe({
                    next: (response) => {
                        if (response.ok) {
                            this.router.navigate(['/transactions']);
                        } else {
                            this.error.set(response.error || 'Error al actualizar la transacción');
                        }
                        this.isLoading.set(false);
                    },
                    error: (error) => {
                        console.error('Error al actualizar la transacción:', error);
                        this.error.set('Error al actualizar la transacción');
                        this.isLoading.set(false);
                    }
                });
        }
    }

    goBack(): void {
        this.router.navigate(['/transactions']);
    }
}
