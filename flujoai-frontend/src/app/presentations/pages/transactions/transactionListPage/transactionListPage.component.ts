import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-transaction-list-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './transactionListPage.component.html',
    styleUrl: './transactionListPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransactionListPageComponent { }
