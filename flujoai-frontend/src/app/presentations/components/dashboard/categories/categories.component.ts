import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryDistribution } from '@interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center sm:text-left">
        Distribución por Categorías
      </h3>
      
      <div class="space-y-4 sm:space-y-6">
        @for (category of getCategories(); track category.name) {
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
              <span class="text-sm sm:text-base text-gray-600">{{ category.name }}</span>
              <span class="font-semibold">{{ category.amount | currency:'USD':'symbol':'1.0-0' }}</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full w-full">
              <div 
                class="h-full rounded-full transition-all duration-500"
                [style.width.%]="category.percentage"
                [class]="category.type === 'income' ? 'bg-green-500' : 'bg-red-500'"
              ></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCategoriesComponent {
  @Input() expensesByCategory: CategoryDistribution | undefined;
  @Input() incomesByCategory: CategoryDistribution | undefined;

  getCategories() {
    const categories: any[] = [];
    let totalAmount = 0;

    if (this.incomesByCategory) {
      Object.entries(this.incomesByCategory).forEach(([name, amount]) => {
        categories.push({ name, amount, type: 'income' });
        totalAmount += amount;
      });
    }

    if (this.expensesByCategory) {
      Object.entries(this.expensesByCategory).forEach(([name, amount]) => {
        categories.push({ name, amount, type: 'expense' });
        totalAmount += amount;
      });
    }

    return categories.map(cat => ({
      ...cat,
      percentage: (cat.amount / totalAmount) * 100
    }));
  }
}