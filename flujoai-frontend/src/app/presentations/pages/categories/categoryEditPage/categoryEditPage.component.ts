import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-category-edit-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './categoryEditPage.component.html',
    styleUrl: './categoryEditPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEditPageComponent { }
