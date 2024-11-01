import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './loginPage.component.html',
    styleUrl: './loginPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent { }
