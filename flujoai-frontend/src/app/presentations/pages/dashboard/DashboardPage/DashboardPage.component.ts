import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DashboardAccountsComponent } from '@app/presentations/components/dashboard/accounts/accounts.component';
import { DashboardCategoriesComponent } from '@app/presentations/components/dashboard/categories/categories.component';
import { DashboardHeaderComponent } from '@app/presentations/components/dashboard/header/header.component';
import { DashboardStatsComponent } from '@app/presentations/components/dashboard/stats/stats.component';
import { DashboardService } from '@app/presentations/services/dashboard.service';
import { BalanceDistribution, CategoryDistribution, DashboardSummary, IncomeExpensesSummary } from '@interfaces/dashboard.interface';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
        DashboardHeaderComponent,
        DashboardStatsComponent,
        DashboardCategoriesComponent,
        DashboardAccountsComponent
    ],
    template: `
    <div class="p-6 space-y-6">
        <app-dashboard-header 
            [totalBalance]="dashboardSummary()?.totalBalance ?? 0"
            [monthlyIncome]="dashboardSummary()?.monthlyIncome ?? 0"
            [monthlyExpenses]="dashboardSummary()?.monthlyExpenses ?? 0"
        />
        <app-dashboard-stats 
            [incomeExpenses]="incomeExpenses()"
        />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <app-dashboard-categories 
                [expensesByCategory]="expensesByCategory()"
                [incomesByCategory]="incomesByCategory()"
            />
            <app-dashboard-accounts 
                [balanceData]="balanceDistribution()"
            />
        </div>
    </div>
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
        // Cargar balance y distribución
        this.dashboardService.getBalanceDistribution().subscribe({
            next: (response) => {
                if (response.ok && response.balanceDistribution) {
                    this.balanceDistribution.set(response.balanceDistribution);
                }
            },
            error: (error) => {
                console.error('Error al cargar balance:', error);
                this.error.set('Error al cargar los datos del dashboard');
            }
        });

        // Cargar ingresos y gastos del mes actual
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        this.dashboardService.getIncomeExpensesByDate(firstDay, lastDay).subscribe({
            next: (response) => {
                if (response.ok && response.summary) {
                    this.incomeExpenses.set(response.summary);
                }
            },
            error: (error) => console.error('Error al cargar ingresos y gastos:', error)
        });

        // Cargar distribución de gastos por categoría
        this.dashboardService.getExpensesByCategory().subscribe({
            next: (response) => {
                if (response.ok && response.distribution) {
                    this.expensesByCategory.set(response.distribution);
                }
            },
            error: (error) => console.error('Error al cargar gastos por categoría:', error)
        });

        // Cargar distribución de ingresos por categoría
        this.dashboardService.getIncomesByCategory().subscribe({
            next: (response) => {
                if (response.ok && response.distribution) {
                    this.incomesByCategory.set(response.distribution);
                }
            },
            error: (error) => console.error('Error al cargar ingresos por categoría:', error)
        });

        // Agregar la carga del dashboard summary
        this.dashboardService.getDashboardSummary().subscribe({
            next: (response) => {
                if (response.ok && response.summary) {
                    this.dashboardSummary.set(response.summary);
                }
            },
            error: (error) => {
                console.error('Error al cargar el resumen:', error);
                this.error.set('Error al cargar los datos del dashboard');
            }
        });
    }
}
