import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BalanceDistribution } from '@interfaces/dashboard.interface';

@Component({
    selector: 'app-balance-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (balanceData) {
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold opacity-90">Balance Total</h2>
                <div class="bg-white/20 rounded-full p-3">
                    <i class="fas fa-wallet text-2xl"></i>
                </div>
            </div>
            
            <div class="mb-6">
                <p class="text-4xl font-bold">{{ balanceData.totalBalance | currency }}</p>
                <p class="text-white/70 text-sm mt-1">Balance actual</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
                @for (account of balanceData.distribution; track account.account_id) {
                    <div class="bg-white/10 rounded-xl p-3">
                        <p class="text-sm opacity-70">{{ account.account_name }}</p>
                        <p class="text-lg font-semibold mt-1">{{ account.balance | currency }}</p>
                    </div>
                }
            </div>
        </div>
    } @else {
        <!-- Skeleton loader -->
        <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 animate-pulse">
            <div class="flex justify-between items-center mb-4">
                <div class="h-6 w-32 bg-white/20 rounded"></div>
                <div class="h-12 w-12 bg-white/20 rounded-full"></div>
            </div>
            
            <div class="mb-6">
                <div class="h-10 w-48 bg-white/20 rounded mb-2"></div>
                <div class="h-4 w-24 bg-white/20 rounded"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/10 rounded-xl p-3">
                    <div class="h-4 w-20 bg-white/20 rounded mb-2"></div>
                    <div class="h-6 w-24 bg-white/20 rounded"></div>
                </div>
                <div class="bg-white/10 rounded-xl p-3">
                    <div class="h-4 w-20 bg-white/20 rounded mb-2"></div>
                    <div class="h-6 w-24 bg-white/20 rounded"></div>
                </div>
            </div>
        </div>
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceCardComponent {
    @Input() balanceData: BalanceDistribution | null = null;
}
