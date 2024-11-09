import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getBalanceDistributionUseCase,
  getIncomeExpensesByDateUseCase,
  getExpensesByCategoryUseCase,
  getIncomesByCategoryUseCase
} from '@use-cases/index';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor() {}

  // Obtener balance y distribución por cuentas
  getBalanceDistribution() {
    return from(getBalanceDistributionUseCase());
  }

  // Obtener ingresos y gastos por rango de fechas
  getIncomeExpensesByDate(startDate: string, endDate: string) {
    return from(getIncomeExpensesByDateUseCase({ startDate, endDate }));
  }

  // Obtener distribución de gastos por categoría
  getExpensesByCategory() {
    return from(getExpensesByCategoryUseCase());
  }

  // Obtener distribución de ingresos por categoría
  getIncomesByCategory() {
    return from(getIncomesByCategoryUseCase());
  }
} 