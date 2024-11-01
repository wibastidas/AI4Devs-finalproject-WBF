import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-transaction-create-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './transactionCreatePage.component.html',
    styleUrl: './transactionCreatePage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransactionCreatePageComponent { }
