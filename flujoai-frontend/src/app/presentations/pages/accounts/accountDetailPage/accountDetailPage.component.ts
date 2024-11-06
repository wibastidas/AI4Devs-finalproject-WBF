import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-account-detail-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './accountDetailPage.component.html',
    styleUrl: './accountDetailPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailPageComponent { }
