import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '@services/account.service';
import { Account } from '@interfaces/account.interface';

@Component({
    selector: 'app-account-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './accountEditPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountEditPageComponent {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private accountService = inject(AccountService);

    public account = signal<Account | null>(null);
    public error = signal<string>('');
    public isLoading = signal<boolean>(false);
    public accountForm!: FormGroup;

    ngOnInit(): void {
        const accountId = this.route.snapshot.params['id'];
        if (accountId) {
            this.loadAccount(accountId);
        }
    }

    private loadAccount(id: string): void {
        this.isLoading.set(true);
        this.accountService.getAccountById(id).subscribe({
            next: (response) => {
                if (response.ok && response.account) {
                    this.account.set(response.account);
                    this.initializeForm(response.account);
                } else {
                    this.error.set(response.error || 'Error al cargar la cuenta');
                }
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error al obtener la cuenta:', error);
                this.error.set('Error al cargar la cuenta');
                this.isLoading.set(false);
            }
        });
    }

    private initializeForm(account: Account): void {
        this.accountForm = this.fb.group({
            name: [account.name, Validators.required],
            description: [account.description],
            business_id: [account.business_id, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.accountForm.valid) {
            const accountId = this.route.snapshot.params['id'];
            this.accountService.updateAccount(accountId, this.accountForm.value)
                .subscribe({
                    next: (response) => {
                        if (response.ok) {
                            this.router.navigate(['/accounts']);
                        } else {
                            this.error.set(response.error || 'Error al actualizar la cuenta');
                        }
                    },
                    error: (error) => {
                        console.error('Error al actualizar la cuenta:', error);
                        this.error.set('Error al actualizar la cuenta');
                    }
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/accounts']);
    }
}
