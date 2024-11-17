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
    monthlyIncome: number;
    monthlyExpenses: number;
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
  
  export interface Analysis {
    currentMargin: number;
    marginRate: number;
    status: {
      type: 'success' | 'warning' | 'info';
      message: string;
    };
  }
  
  export interface IncomeExpensesResponse {
    ok: boolean;
    summary?: IncomeExpensesSummary;
    analysis?: Analysis;
    error?: string;
  }