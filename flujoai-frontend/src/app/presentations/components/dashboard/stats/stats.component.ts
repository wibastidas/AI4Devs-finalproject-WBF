import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IncomeExpensesSummary } from '@interfaces/dashboard.interface';
import { DateRangeSelectorComponent } from '../date-range-selector/date-range-selector.component';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, DateRangeSelectorComponent],
  template: `
    <app-date-range-selector
      (dateRangeChange)="onDateRangeChange($event)"
    />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
      <div class="bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <div class="text-center sm:text-left">
            <h3 class="text-base sm:text-base md:text-lg font-semibold text-gray-600">Ingresos del Período</h3>
            <p class="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mt-2">
              {{ incomeExpenses?.totalIncome | currency:'USD':'symbol':'1.0-0' }}
            </p>
          </div>
          <div class="text-3xl sm:text-4xl md:text-5xl text-green-500 opacity-80">
            <i class="fas fa-arrow-trend-up"></i>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <div class="text-center sm:text-left">
            <h3 class="text-base sm:text-base md:text-lg font-semibold text-gray-600">Gastos del Período</h3>
            <p class="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mt-2">
              {{ incomeExpenses?.totalExpenses | currency:'USD':'symbol':'1.0-0' }}
            </p>
          </div>
          <div class="text-3xl sm:text-4xl md:text-5xl text-red-500 opacity-80">
            <i class="fas fa-arrow-trend-down"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatsComponent {
  @Input() incomeExpenses?: IncomeExpensesSummary;
  @Output() dateRangeChange = new EventEmitter<{start: string, end: string}>();

  onDateRangeChange(dateRange: {start: string, end: string}) {
    this.dateRangeChange.emit(dateRange);
  }
}
