import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/interfaces/category.interface';
import { CategoryService } from '@app/presentations/services/category.service';
import { DialogService } from '@app/presentations/services/dialog.service';

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
  private dialogService = inject(DialogService);

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

  async deleteCategory(category: Category): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Eliminar categoría',
      message: `¿Estás seguro que deseas eliminar la categoría "${category.name}"?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      color: 'red',
      icon: 'fas fa-trash'
    });

    if (confirmed) {
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (response) => {
          if (response.ok) {
            this.loadCategories();
          } else {
            this.error.set(response.error || 'Error al eliminar la categoría');
          }
        },
        error: (error) => {
          console.error('Error al eliminar la categoría:', error);
          this.error.set('Error al eliminar la categoría');
        }
      });
    }
  }
}
