import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BalanceDistribution } from '@interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center sm:text-left">
        Distribución por Cuentas
      </h3>
      
      <div class="space-y-4 sm:space-y-6">
        @for (account of balanceData?.distribution ?? []; track account.account_id) {
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
              <span class="text-sm sm:text-base text-gray-600">{{ account.account_name }}</span>
              <span class="font-semibold">{{ account.balance | currency:'USD':'symbol':'1.0-0' }}</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full w-full">
              <div 
                class="h-full bg-indigo-500 rounded-full transition-all duration-500"
                [style.width.%]="(account.balance / (balanceData?.totalBalance ?? 1)) * 100"
              ></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAccountsComponent {
  @Input() balanceData: BalanceDistribution | undefined;
}
