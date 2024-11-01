import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './registerPage.component.html',
    styleUrl: './registerPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent { }
