import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/interfaces/category.interface';
import { CategoryService } from '@app/presentations/services/category.service';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './categoryListPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListPageComponent {
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  public categories = signal<Category[]>([]);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (response) => {
          if (response.ok && Array.isArray(response.categories)) {
            this.categories.set(response.categories);
            this.error.set(null);
          } else {
            this.error.set(response.error || 'Error al cargar las categorías');
            this.categories.set([]);
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al obtener las categorías:', error);
          this.error.set('Error al cargar las categorías');
          this.categories.set([]);
          this.isLoading.set(false);
        }
      });
  }

  createCategory(): void {
    this.router.navigate(['/categories/create']);
  }

  editCategory(category: Category): void {
    this.router.navigate(['categories/edit', category.id], {
      state: { category }
    });
  }

  viewCategory(id: number): void {
    this.router.navigate(['/categories', id]);
  }
}
