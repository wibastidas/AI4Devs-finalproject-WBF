import { BalanceDistribution, IncomeExpensesSummary, CategoryDistribution } from './dashboard.interface';

export interface BalanceDistributionResponse {
    ok: boolean;
    balanceDistribution?: BalanceDistribution;
    error?: string;
}

export interface IncomeExpensesSummaryResponse {
    ok: boolean;
    error?: string;
    summary?: {
        monthlyIncome: number;
        monthlyExpenses: number;
    };
    analysis?: {
        currentMargin: number;
        marginRate: number;
        status: {
            type: 'success' | 'warning' | 'info';
            message: string;
        }
    };
    comparison?: {
        previousPeriod: {
            income: number;
            expenses: number;
            startDate: string;
            endDate: string;
        };
        variations: {
            income: {
                amount: number;
                percentage: string;
                trend: 'up' | 'down';
            };
            expenses: {
                amount: number;
                percentage: string;
                trend: 'up' | 'down';
            };
        };
    };
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