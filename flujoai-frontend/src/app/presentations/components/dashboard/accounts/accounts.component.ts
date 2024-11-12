import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BalanceDistribution } from '@interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-8 overflow-hidden">
      <div class="overflow-x-auto px-6 pb-2 -mx-6">
        <div class="flex gap-4 snap-x snap-mandatory min-w-min">
          @for (account of balanceData?.distribution ?? []; track account.account_id) {
            <div class="snap-start shrink-0 first:ml-0 last:mr-6">
              <div class="bg-white rounded-2xl p-4 shadow-sm w-[200px]">
                <div class="space-y-2">
                  <h4 class="text-sm font-medium text-gray-600">{{ account.account_name }}</h4>
                  <p class="text-lg font-bold text-gray-900">
                    {{ account.balance | currency:'USD':'symbol':'1.0-0' }}
                  </p>
                  <div class="h-1 bg-gray-200 rounded-full">
                    <div 
                      class="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      [style.width.%]="(account.balance / (balanceData?.totalBalance ?? 1)) * 100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardAccountsComponent {
  @Input() balanceData: BalanceDistribution | undefined;
}