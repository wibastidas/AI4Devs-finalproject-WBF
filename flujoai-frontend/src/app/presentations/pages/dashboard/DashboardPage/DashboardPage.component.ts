import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './DashboardPage.component.html',
    styleUrl: './DashboardPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent { }
