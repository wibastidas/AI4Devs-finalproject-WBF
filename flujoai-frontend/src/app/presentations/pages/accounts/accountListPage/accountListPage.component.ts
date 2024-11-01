import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-account-list-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './accountListPage.component.html',
    styleUrl: './accountListPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountListPageComponent { }
