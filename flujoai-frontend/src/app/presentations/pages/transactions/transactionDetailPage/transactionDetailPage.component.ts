import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-transaction-detail-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './transactionDetailPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailPageComponent { }
