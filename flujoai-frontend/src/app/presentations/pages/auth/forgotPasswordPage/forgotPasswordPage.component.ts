import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-forgot-password-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './forgotPasswordPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotPasswordPageComponent {
    forgotPasswordForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.forgotPasswordForm.valid) {
            const { email } = this.forgotPasswordForm.value;
            console.log('Email:', email);
            // Aquí puedes manejar la lógica para enviar el enlace de recuperación
        }
    }
}
