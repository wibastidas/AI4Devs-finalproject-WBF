export interface BalanceDistribution {
    totalBalance: number;
    distribution: {
        account_id: number;
        account_name: string;
        balance: number;
    }[];
}

export interface IncomeExpensesSummary {
    totalIncome: number;
    totalExpenses: number;
}

export interface CategoryDistribution {
    [key: string]: number;
}
