import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getDashboardSummaryUseCase,
  getBalanceDistributionUseCase,
  getIncomeExpensesByDateUseCase,
  getExpensesByCategoryUseCase,
  getIncomesByCategoryUseCase
} from '@use-cases/index';
import { AuthService } from './AuthService.service';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private authService: AuthService) {}

  getDashboardSummary(startDate: string, endDate: string) {
    const getToken = () => this.authService.getToken();
    return from(getDashboardSummaryUseCase({ startDate, endDate }, getToken));
  }

  getBalanceDistribution() {
    const getToken = () => this.authService.getToken();
    return from(getBalanceDistributionUseCase(getToken));
  }

  getIncomeExpensesByDate(startDate: string, endDate: string) {
    const getToken = () => this.authService.getToken();
    return from(getIncomeExpensesByDateUseCase({ startDate, endDate }, getToken));
  }

  getExpensesByCategory(startDate: string, endDate: string) {
    const getToken = () => this.authService.getToken();
    return from(getExpensesByCategoryUseCase({ startDate, endDate }, getToken));
  }

  getIncomesByCategory(startDate: string, endDate: string) {
    const getToken = () => this.authService.getToken();
    return from(getIncomesByCategoryUseCase({ startDate, endDate }, getToken));
  }
} 