import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/presentations/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-create-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './accountCreatePage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreatePageComponent {
    accountForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private router: Router
    ) {
        this.accountForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            business_id: 1
        });
    }

    onSubmit() {
        if (this.accountForm.valid) {
            this.accountService.createAccount(this.accountForm.value)
                .subscribe({
                    next: (response) => {
                        this.accountForm.reset();
                        this.router.navigate(['/accounts']);
                    },
                    error: (error) => {
                        console.error('Error al crear la cuenta:', error);
                    }
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/accounts']);
    }
}
