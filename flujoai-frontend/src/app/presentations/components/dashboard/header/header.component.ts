import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-4 sm:p-6 text-white">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left w-full sm:w-auto">
          <h2 class="text-xl sm:text-2xl font-semibold opacity-80">Balance Total</h2>
          <p class="text-3xl sm:text-4xl font-bold mt-2">
            {{ totalBalance | currency:'USD':'symbol':'1.0-0' }}
          </p>
        </div>
        <div class="text-4xl sm:text-6xl opacity-80">
          <i class="fas fa-wallet"></i>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div class="text-center sm:text-left">
          <p class="text-xs sm:text-sm opacity-80">Ingresos del Mes</p>
          <p class="text-xl sm:text-2xl font-semibold text-green-400">
            {{ monthlyIncome | currency:'USD':'symbol':'1.0-0' }}
          </p>
        </div>
        <div class="text-center sm:text-left">
          <p class="text-xs sm:text-sm opacity-80">Gastos del Mes</p>
          <p class="text-xl sm:text-2xl font-semibold text-red-400">
            {{ monthlyExpenses | currency:'USD':'symbol':'1.0-0' }}
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  @Input() totalBalance: number = 0;
  @Input() monthlyIncome: number = 0;
  @Input() monthlyExpenses: number = 0;
}
