import { BalanceDistribution, IncomeExpensesSummary, CategoryDistribution } from './dashboard.interface';

export interface BalanceDistributionResponse {
    ok: boolean;
    balanceDistribution?: BalanceDistribution;
    error?: string;
}

export interface IncomeExpensesSummaryResponse {
    ok: boolean;
    summary?: IncomeExpensesSummary;
    error?: string;
}

export interface CategoryDistributionResponse {
    ok: boolean;
    distribution?: CategoryDistribution;
    error?: string;
}

export interface DashboardSummaryResponse {
    ok: boolean;
    summary?: {
        totalBalance: number;
        monthlyIncome: number;
        monthlyExpenses: number;
    };
    error?: string;
} 