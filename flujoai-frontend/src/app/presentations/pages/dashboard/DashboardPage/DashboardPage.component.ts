import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DashboardService } from '@app/presentations/services/dashboard.service';
import { BalanceDistribution, CategoryDistribution, IncomeExpensesSummary } from '@interfaces/dashboard.interface';
import { BalanceCardComponent } from '@components/balanceCard/balanceCard.component';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
        BalanceCardComponent
    ],
    template: `
    <div class="space-y-6">
        <app-balance-card [balanceData]="balanceDistribution()" />
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPageComponent {
    private dashboardService = inject(DashboardService);
    
    // Signals para el estado
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
        console.log('🔄 Iniciando carga de datos del dashboard');
        
        this.dashboardService.getBalanceDistribution().subscribe({
            next: (response) => {
                console.log('📊 Respuesta de balance:', response);
                if (response.ok && response.balanceDistribution) {
                    console.log('💰 Balance distribution:', response.balanceDistribution);
                    this.balanceDistribution.set(response.balanceDistribution);
                }
            },
            error: (error) => {
                console.error('❌ Error al cargar balance:', error);
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
    }
}
