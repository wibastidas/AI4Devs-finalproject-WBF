import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-transaction-edit-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './transactionEditPage.component.html',
    styleUrl: './transactionEditPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionEditPageComponent { }
