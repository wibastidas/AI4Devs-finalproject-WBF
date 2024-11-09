import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DashboardAccountsComponent } from '@app/presentations/components/dashboard/accounts/accounts.component';
import { DashboardCategoriesComponent } from '@app/presentations/components/dashboard/categories/categories.component';
import { DashboardHeaderComponent } from '@app/presentations/components/dashboard/header/header.component';
import { DashboardSkeletonComponent } from '@app/presentations/components/dashboard/skeleton/dashboard-skeleton.component';
import { DashboardStatsComponent } from '@app/presentations/components/dashboard/stats/stats.component';
import { DashboardService } from '@app/presentations/services/dashboard.service';
import { BalanceDistribution, CategoryDistribution, DashboardSummary, IncomeExpensesSummary } from '@interfaces/dashboard.interface';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
        DashboardHeaderComponent,
        DashboardStatsComponent,
        DashboardCategoriesComponent,
        DashboardAccountsComponent,
        DashboardSkeletonComponent
    ],
    template: `
    @if (isLoading()) {
        <app-dashboard-skeleton />
    } @else {
        <div class="p-6 space-y-8">
            <app-dashboard-header 
                [totalBalance]="dashboardSummary()?.totalBalance ?? 0"
            />
            <app-dashboard-stats 
                [incomeExpenses]="incomeExpenses()"
                (dateRangeChange)="onDateRangeChange($event)"
            />
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <app-dashboard-categories 
                    [expensesByCategory]="expensesByCategory()"
                    [incomesByCategory]="incomesByCategory()"
                />
                <app-dashboard-accounts 
                    [balanceData]="balanceDistribution()"
                />
            </div>
        </div>
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {
    private dashboardService = inject(DashboardService);
    
    // Signals para el estado
    public dashboardSummary = signal<DashboardSummary | null>(null);
    public balanceDistribution = signal<BalanceDistribution | null>(null);
    public incomeExpenses = signal<IncomeExpensesSummary | null>(null);
    public expensesByCategory = signal<CategoryDistribution | null>(null);
    public incomesByCategory = signal<CategoryDistribution | null>(null);
    public isLoading = signal<boolean>(true);
    public error = signal<string | null>(null);

    constructor() {
        this.loadDashboardData();
    }

    private loadDashboardData(): void {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        forkJoin({
            balance: this.dashboardService.getBalanceDistribution(),
            incomeExpenses: this.dashboardService.getIncomeExpensesByDate(firstDay, lastDay),
            expenses: this.dashboardService.getExpensesByCategory(),
            incomes: this.dashboardService.getIncomesByCategory(),
            summary: this.dashboardService.getDashboardSummary()
        }).subscribe({
            next: (responses) => {
                console.log('Todas las respuestas:', responses);
                console.log('Balance Response:', responses.balance);
                console.log('Summary Response:', responses.summary);
                console.log('Summary Data:', responses.summary.summary);
                
                if (responses.summary.ok && responses.summary.summary) {
                    const summaryData = responses.summary.summary;
                    console.log('Summary antes de conversion:', summaryData);
                    
                    const summary = {
                        totalBalance: Number(summaryData.totalBalance),
                        monthlyIncome: Number(summaryData.monthlyIncome),
                        monthlyExpenses: Number(summaryData.monthlyExpenses)
                    };
                    console.log('Summary después de conversion:', summary);
                    this.dashboardSummary.set(summary);
                    console.log('Signal después de set:', this.dashboardSummary());
                }
                
                if (responses.balance.ok && responses.balance.balanceDistribution) {
                    this.balanceDistribution.set(responses.balance.balanceDistribution);
                }
                if (responses.incomeExpenses.ok && responses.incomeExpenses.summary) {
                    this.incomeExpenses.set(responses.incomeExpenses.summary);
                }
                if (responses.expenses.ok && responses.expenses.distribution) {
                    this.expensesByCategory.set(responses.expenses.distribution);
                }
                if (responses.incomes.ok && responses.incomes.distribution) {
                    this.incomesByCategory.set(responses.incomes.distribution);
                }
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading dashboard data:', error);
                this.error.set('Error al cargar los datos del dashboard');
                this.isLoading.set(false);
            }
        });
    }

    onDateRangeChange(dateRange: {start: string, end: string}): void {
        this.isLoading.set(true);
        
        forkJoin({
            incomeExpenses: this.dashboardService.getIncomeExpensesByDate(dateRange.start, dateRange.end),
            expenses: this.dashboardService.getExpensesByCategory(),
            incomes: this.dashboardService.getIncomesByCategory(),
        }).subscribe({
            next: (responses) => {
                if (responses.incomeExpenses.ok && responses.incomeExpenses.summary) {
                    this.incomeExpenses.set(responses.incomeExpenses.summary);
                }
                if (responses.expenses.ok && responses.expenses.distribution) {
                    this.expensesByCategory.set(responses.expenses.distribution);
                }
                if (responses.incomes.ok && responses.incomes.distribution) {
                    this.incomesByCategory.set(responses.incomes.distribution);
                }
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading dashboard data:', error);
                this.error.set('Error al cargar los datos del dashboard');
                this.isLoading.set(false);
            }
        });
    }
}
