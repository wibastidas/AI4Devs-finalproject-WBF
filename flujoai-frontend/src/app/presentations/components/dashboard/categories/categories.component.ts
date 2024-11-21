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
    
    <!-- Estado sin categorías -->
    @if (getIngresos().length === 0 && getGastos().length === 0) {
      <div class="text-center py-8 text-gray-500">
        No hay categorías con transacciones en el rango de fechas seleccionado
      </div>
    } @else {
      <div class="space-y-6">
        @if (getIngresos().length > 0) {
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-green-600 opacity-75 border-b pb-2">Ingresos</h4>
            @for (category of getIngresos(); track category.name) {
              <div class="space-y-2">
                <div class="flex justify-between items-baseline">
                  <span class="text-sm sm:text-base text-gray-600">{{ category.name }}</span>
                  <div class="text-right">
                    <span class="block font-semibold text-base sm:text-lg text-green-600">
                      {{ category.amount | currency:'USD':'symbol':'1.0-0' }}
                    </span>
                    <span class="text-xs text-gray-500">{{ category.percentage | number:'1.0-1' }}% del total</span>
                  </div>
                </div>
                <div class="h-2 bg-gray-200 rounded-full w-full">
                  <div 
                    class="h-full rounded-full transition-all duration-500 bg-green-500"
                    [style.width.%]="category.percentage"
                  ></div>
                </div>
              </div>
            }
          </div>
        }

        @if (getGastos().length > 0) {
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-red-600 opacity-75 border-b pb-2">Gastos</h4>
            @for (category of getGastos(); track category.name) {
              <div class="space-y-2">
                <div class="flex justify-between items-baseline">
                  <span class="text-sm sm:text-base text-gray-600">{{ category.name }}</span>
                  <div class="text-right">
                    <span class="block font-semibold text-base sm:text-lg text-red-600">
                      {{ category.amount | currency:'USD':'symbol':'1.0-0' }}
                    </span>
                    <span class="text-xs text-gray-500">{{ category.percentage | number:'1.0-1' }}% del total</span>
                  </div>
                </div>
                <div class="h-2 bg-gray-200 rounded-full w-full">
                  <div 
                    class="h-full rounded-full transition-all duration-500 bg-red-500"
                    [style.width.%]="category.percentage"
                  ></div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    }
  </div>
`
})
export class DashboardCategoriesComponent {
  @Input() expensesByCategory: CategoryDistribution | undefined;
  @Input() incomesByCategory: CategoryDistribution | undefined;

  getIngresos() {
    const categories: any[] = [];
    let totalIngresos = 0;

    if (this.incomesByCategory) {
      Object.entries(this.incomesByCategory).forEach(([name, amount]) => {
        totalIngresos += amount;
      });

      Object.entries(this.incomesByCategory).forEach(([name, amount]) => {
        categories.push({
          name,
          amount,
          type: 'income',
          percentage: (amount / totalIngresos) * 100
        });
      });
    }

    return categories;
  }

  getGastos() {
    const categories: any[] = [];
    let totalGastos = 0;

    if (this.expensesByCategory) {
      Object.entries(this.expensesByCategory).forEach(([name, amount]) => {
        totalGastos += amount;
      });

      Object.entries(this.expensesByCategory).forEach(([name, amount]) => {
        categories.push({
          name,
          amount,
          type: 'expense',
          percentage: (amount / totalGastos) * 100
        });
      });
    }

    return categories;
  }
}