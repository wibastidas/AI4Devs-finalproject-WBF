import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@app/interfaces/account.interface';
import { AccountService } from '@app/presentations/services/account.service';

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
    public isLoading = signal(true);
    public error = signal<string | null>(null);
    public isSaving = signal(false);

    public accountForm: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        business_id: 1
    });

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        const accountFromState = navigation?.extras?.state?.['account'] as Account;

        if (accountFromState) {
            this.initializeForm(accountFromState);
        } else {
            const accountId = this.route.snapshot.paramMap.get('id');
            if (accountId) this.loadAccount(accountId);
        }
    }

    private initializeForm(account: Account): void {
        this.account.set(account);
        this.accountForm.patchValue({
            name: account.name,
            description: account.description,
        });
        this.isLoading.set(false);
    }

    private loadAccount(id: string): void {
        this.accountService.getAccountById(id).subscribe({
            next: (response) => {
                if (response.ok && 'id' in response) {
                    const { id, name, description, business_id, created_at, updated_at } = response;
                    this.account.set({ id, name, description, business_id, created_at, updated_at });
                    this.initializeForm(response);
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

    onSubmit(): void {
        if (this.accountForm.valid) {
            const accountId = this.route.snapshot.params['id'];
            this.accountService.updateAccount(accountId, this.accountForm.value)
                .subscribe({
                    next: (response) => {
                        console.log('Cuenta actualizada exitosamente:', response);
                        this.router.navigate(['/accounts']);
                    },
                    error: (error) => {
                        console.error('Error al actualizar la cuenta:', error);
                    }
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/accounts']);
    }
}
