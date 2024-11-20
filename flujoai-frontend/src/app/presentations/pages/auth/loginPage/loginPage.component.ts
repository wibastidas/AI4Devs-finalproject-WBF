import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/AuthService.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './loginPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            try {
                const success = await this.authService.login(email, password);
                if (!success) {
                    this.errorMessage = 'Credenciales inválidas';
                }
            } catch (error) {
                this.errorMessage = 'Error al iniciar sesión';
            }
        }
    }
}
