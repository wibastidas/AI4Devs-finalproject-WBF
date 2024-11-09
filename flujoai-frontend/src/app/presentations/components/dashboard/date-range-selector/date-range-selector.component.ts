import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-date-range-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-4 sm:px-0 mb-8 mt-4">
      <div class="w-full md:w-[500px] lg:w-[400px] ml-auto">
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="w-full">
              <label for="startDate" class="block text-sm font-medium text-gray-200 mb-1">
                Fecha Inicio
              </label>
              <input 
                type="date" 
                id="startDate"
                [value]="startDate()"
                (change)="onStartDateChange($event)"
                [max]="endDate()"
                class="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm">
            </div>
            
            <div class="w-full">
              <label for="endDate" class="block text-sm font-medium text-gray-200 mb-1">
                Fecha Fin
              </label>
              <input 
                type="date" 
                id="endDate"
                [value]="endDate()"
                (change)="onEndDateChange($event)"
                [min]="startDate()"
                class="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm">
            </div>
          </div>

          <button 
            (click)="applyDateRange()"
            class="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            Aplicar Filtro
          </button>
        </div>
        @if (error()) {
          <p class="text-red-400 text-xs mt-2 text-center">{{ error() }}</p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeSelectorComponent {
  @Output() dateRangeChange = new EventEmitter<{start: string, end: string}>();
  
  public startDate = signal(this.getDefaultStartDate());
  public endDate = signal(this.getDefaultEndDate());
  public error = signal<string | null>(null);

  private getDefaultStartDate(): string {
    const date = new Date();
    date.setDate(1); // Primer día del mes actual
    return date.toISOString().split('T')[0];
  }

  private getDefaultEndDate(): string {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.toISOString().split('T')[0];
  }

  onStartDateChange(event: Event): void {
    const newDate = (event.target as HTMLInputElement).value;
    this.startDate.set(newDate);
    this.validateDateRange();
  }

  onEndDateChange(event: Event): void {
    const newDate = (event.target as HTMLInputElement).value;
    this.endDate.set(newDate);
    this.validateDateRange();
  }

  private validateDateRange(): boolean {
    const start = new Date(this.startDate());
    const end = new Date(this.endDate());
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.error.set('Formato de fecha inválido');
      return false;
    }

    // Calcular diferencia en meses
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                  (end.getMonth() - start.getMonth());
    
    if (months > 6) {
      this.error.set('El rango no puede ser mayor a 6 meses');
      return false;
    }
    
    if (end < start) {
      this.error.set('La fecha final no puede ser menor a la inicial');
      return false;
    }

    this.error.set(null);
    return true;
  }

  applyDateRange(): void {
    if (this.validateDateRange()) {
      this.dateRangeChange.emit({
        start: this.startDate(),
        end: this.endDate()
      });
    }
  }
}
