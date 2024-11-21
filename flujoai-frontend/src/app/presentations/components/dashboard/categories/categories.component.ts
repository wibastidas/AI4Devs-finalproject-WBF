import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '@app/interfaces/chart.interface';
import { CategoryDistribution } from '@interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-categories',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
  <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
    <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center sm:text-left">
      Distribución por Categorías
    </h3>
    
    @if (getIngresos().length === 0 && getGastos().length === 0) {
      <div class="text-center py-8 text-gray-500">
        No hay categorías con transacciones en el rango de fechas seleccionado
      </div>
    } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        @if (getIngresos().length > 0) {
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-green-600 opacity-75 text-center">Ingresos</h4>
            <div class="relative" style="height: 300px">
              <apx-chart
                [series]="incomesChartOptions.series"
                [chart]="incomesChartOptions.chart"
                [labels]="incomesChartOptions.labels"
                [colors]="incomesChartOptions.colors"
                [plotOptions]="incomesChartOptions.plotOptions"
                [legend]="incomesChartOptions.legend">
              </apx-chart>
            </div>
          </div>
        }
        @if (getGastos().length > 0) {
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-red-600 opacity-75 text-center">Gastos</h4>
            <div class="relative" style="height: 300px">
              <apx-chart
                [series]="expensesChartOptions.series"
                [chart]="expensesChartOptions.chart"
                [labels]="expensesChartOptions.labels"
                [colors]="expensesChartOptions.colors"
                [plotOptions]="expensesChartOptions.plotOptions"
                [legend]="expensesChartOptions.legend">
              </apx-chart>
            </div>
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

  get incomesChartOptions(): ChartOptions {
    const categories = this.getIngresos();
    return {
      series: categories.map(c => c.amount),
      chart: {
        type: 'donut' as const,
        height: 300,
        foreColor: '#374151',
        events: {
          dataPointSelection: function(event, chartContext, config) {
            const value = config.w.globals.series[config.dataPointIndex];
            const formattedValue = value.toLocaleString('es', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
            // Actualiza el valor seleccionado con el formato de moneda
            config.w.globals.selectedDataPoints[0] = formattedValue;
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts) {
          return opts.w.globals.labels[opts.seriesIndex] + ': ' + 
                 val.toLocaleString('es', {
                   style: 'currency',
                   currency: 'USD',
                   minimumFractionDigits: 0,
                   maximumFractionDigits: 0
                 });
        }
      },
      labels: categories.map(c => c.name),
      colors: categories.map((_, i) => {
        const opacity = 0.7 + (i * 0.1);
        return `rgba(34, 197, 94, ${opacity})`;
      }),
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                color: '#374151',
                formatter: function(w) {
                  const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                  return `$${total.toLocaleString('es', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}`;
                }
              }
            }
          }
        }
      },
      legend: {
        show: true,
        labels: {
          colors: '#374151'
        }
      }
    };
  }

  get expensesChartOptions(): ChartOptions {
    const categories = this.getGastos();
    return {
      series: categories.map(c => c.amount),
      chart: {
        type: 'donut' as const,
        height: 300,
        foreColor: '#374151'
      },
      labels: categories.map(c => c.name),
      colors: categories.map((_, i) => {
        const opacity = 0.7 + (i * 0.1);
        return `rgba(239, 68, 68, ${opacity})`;
      }),
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                color: '#374151',
                formatter: function(w) {
                  const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                  return `$${total.toLocaleString('es', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}`;
                }
              }
            }
          }
        }
      },
      legend: {
        show: true,
        labels: {
          colors: '#374151'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts: { seriesIndex: number; w: any }) {
          return opts.w.globals.labels[opts.seriesIndex] + ': ' + 
                 val.toLocaleString('es', {
                   style: 'currency',
                   currency: 'USD',
                   minimumFractionDigits: 0,
                   maximumFractionDigits: 0
                 });
        }
      }
    };
  }
}