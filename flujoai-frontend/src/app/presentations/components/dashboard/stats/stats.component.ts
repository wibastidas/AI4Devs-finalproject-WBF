import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IncomeExpensesSummary, Analysis } from '@interfaces/dashboard.interface';
import { DateRangeSelectorComponent } from '../date-range-selector/date-range-selector.component';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, DateRangeSelectorComponent],
  template: `
    <app-date-range-selector
      (dateRangeChange)="onDateRangeChange($event)"
    />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-4">
      <div class="bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <div class="text-center sm:text-left">
            <h3 class="text-base sm:text-base md:text-lg font-semibold text-gray-600">Ingresos del Período</h3>
            <p class="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mt-2">
              {{ incomeExpenses?.monthlyIncome | currency:'USD':'symbol' }}
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
              {{ incomeExpenses?.monthlyExpenses | currency:'USD':'symbol' }}
            </p>
          </div>
          <div class="text-3xl sm:text-4xl md:text-5xl text-red-500 opacity-80">
            <i class="fas fa-arrow-trend-down"></i>
          </div>
        </div>
      </div>
    </div>

    @if (analysis) {
      <div class="bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm mb-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <h4 class="text-sm font-medium text-gray-600">Margen</h4>
            <p [class]="analysis.currentMargin >= 0 ? 'text-green-600' : 'text-red-600'" 
               class="text-xl font-bold">
              {{ analysis.currentMargin | currency:'USD':'symbol' }}
            </p>
          </div>
          
          <div class="flex flex-col gap-2">
            <h4 class="text-sm font-medium text-gray-600">Tasa de Margen</h4>
            <p [class]="analysis.marginRate >= 0 ? 'text-green-600' : 'text-red-600'"
               class="text-xl font-bold">
              {{ analysis.marginRate.toFixed(1) }}%
            </p>
          </div>

          <div [class]="getStatusClass(analysis.status.type)"
               class="flex items-center p-4 rounded-xl">
            <p [class]="getStatusTextClass(analysis.status.type)"
               class="text-sm font-medium">
              {{ analysis.status.message }}
            </p>
          </div>
        </div>
      </div>
    }
  `
})
export class DashboardStatsComponent {
  @Input() incomeExpenses?: IncomeExpensesSummary;
  @Input() analysis?: Analysis;
  @Output() dateRangeChange = new EventEmitter<{start: string, end: string}>();

  onDateRangeChange(dateRange: {start: string, end: string}) {
    this.dateRangeChange.emit(dateRange);
  }

  getStatusClass(type: 'success' | 'warning' | 'info'): string {
    switch(type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      case 'info': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  }

  getStatusTextClass(type: 'success' | 'warning' | 'info'): string {
    switch(type) {
      case 'success': return 'text-green-700';
      case 'warning': return 'text-yellow-700';
      case 'info': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  }
}
