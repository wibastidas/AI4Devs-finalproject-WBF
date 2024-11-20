import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './registerPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
    registerForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(group: FormGroup) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    async onSubmit() {
        if (this.registerForm.valid) {
            const { email, password } = this.registerForm.value;
            
            this.userService.createUser({
                email,
                password,
            }).subscribe({
                next: (response) => {
                    if (response.ok) {
                        this.router.navigate(['/auth/login']);
                    } else {
                        this.errorMessage = response.error || 'Error al registrar usuario';
                    }
                },
                error: (error) => {
                    this.errorMessage = 'Error al registrar usuario';
                }
            });
        }
    }
}
