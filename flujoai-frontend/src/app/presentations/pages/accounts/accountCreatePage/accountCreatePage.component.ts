import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-account-create-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './accountCreatePage.component.html',
    styleUrl: './accountCreatePage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountCreatePageComponent { }
