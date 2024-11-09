export interface DateRangeParams {
    startDate: string;
    endDate: string;
  }
  
  export interface DashboardSummary {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
  }
  
  export interface IncomeExpensesSummary {
    totalIncome: number;
    totalExpenses: number;
  }
  
  export interface CategoryDistribution {
    [key: string]: number;
  }
  
  export interface BalanceDistribution {
    totalBalance: number;
    distribution: {
      account_id: number;
      account_name: string;
      balance: number;
    }[];
  }