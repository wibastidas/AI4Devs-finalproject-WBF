import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '@app/core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './categoryListPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListPageComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockCategories();
  }

  loadMockCategories(): void {
    this.categories = [
      { id: 1, name: 'Alimentos', type: 'expense', description: 'Gastos en alimentos', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Salario', type: 'income', description: 'Ingreso mensual', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Transporte', type: 'expense', description: 'Gastos en transporte', created_at: new Date(), updated_at: new Date() },
    ];
  }

  translateType(type: string): string {
    return type === 'expense' ? 'Gasto' : 'Ingreso';
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
    console.log(`Ver detalles de la categoría con ID: ${id}`);
  }
}
