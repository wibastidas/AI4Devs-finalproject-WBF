import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-category-detail-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './categoryDetailPage.component.html',
    styleUrl: './categoryDetailPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailPageComponent { }
