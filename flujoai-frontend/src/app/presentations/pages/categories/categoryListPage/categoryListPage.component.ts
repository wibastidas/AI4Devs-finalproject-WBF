import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-category-list-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './categoryListPage.component.html',
    styleUrl: './categoryListPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListPageComponent { }
