import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getDashboardSummaryUseCase,
  getBalanceDistributionUseCase,
  getIncomeExpensesByDateUseCase,
  getExpensesByCategoryUseCase,
  getIncomesByCategoryUseCase
} from '@use-cases/index';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor() {}

  getDashboardSummary(startDate: string, endDate: string) {
    return from(getDashboardSummaryUseCase({ startDate, endDate }));
  }

  getBalanceDistribution() {
    return from(getBalanceDistributionUseCase());
  }

  getIncomeExpensesByDate(startDate: string, endDate: string) {
    return from(getIncomeExpensesByDateUseCase({ startDate, endDate }));
  }

  getExpensesByCategory(startDate: string, endDate: string) {
    return from(getExpensesByCategoryUseCase({ startDate, endDate }));
  }

  getIncomesByCategory(startDate: string, endDate: string) {
    return from(getIncomesByCategoryUseCase({ startDate, endDate }));
  }
} 