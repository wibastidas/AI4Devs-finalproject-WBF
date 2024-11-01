
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-forgot-password-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './forgotPasswordPage.component.html',
    styleUrl: './forgotPasswordPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotPasswordPageComponent { }
