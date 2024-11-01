import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-account-edit-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './accountEditPage.component.html',
    styleUrl: './accountEditPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountEditPageComponent { }
