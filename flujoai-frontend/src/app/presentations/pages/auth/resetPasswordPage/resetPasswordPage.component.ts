import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-reset-password-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './resetPasswordPage.component.html',
    styleUrl: './resetPasswordPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetPasswordPageComponent { }
