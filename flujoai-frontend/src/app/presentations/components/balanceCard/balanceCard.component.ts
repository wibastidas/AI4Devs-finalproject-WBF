import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BalanceDistribution } from '@interfaces/dashboard.interface';

@Component({
    selector: 'app-balance-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card">
        <div class="balance-section">
            <h2>Balance Total</h2>
            <p>{{ balanceData?.totalBalance | currency }}</p>
        </div>
        <div class="monthly-section">
            <div>
                <h3>Ingresos del Mes</h3>
                <p class="income">{{ monthlyIncome | currency }}</p>
            </div>
            <div>
                <h3>Gastos del Mes</h3>
                <p class="expense">{{ monthlyExpenses | currency }}</p>
            </div>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceCardComponent {
    @Input() balanceData: BalanceDistribution | null = null;
    @Input() monthlyIncome: number = 0;
    @Input() monthlyExpenses: number = 0;
}
