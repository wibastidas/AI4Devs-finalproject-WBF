import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './registerPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const { email, password } = this.registerForm.value;
            console.log('Email:', email, 'Password:', password);
            // Aquí puedes manejar la lógica de registro
        }
    }
}
