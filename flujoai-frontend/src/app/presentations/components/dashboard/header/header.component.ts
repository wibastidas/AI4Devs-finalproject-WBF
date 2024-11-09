import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-4 sm:p-5 md:p-6 text-white">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
        <div class="text-center sm:text-left w-full sm:w-auto">
          <h2 class="text-xl sm:text-xl md:text-2xl font-semibold opacity-80">Balance Total</h2>
          <p class="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            {{ totalBalance | currency:'USD':'symbol':'1.0-0' }}
          </p>
        </div>
        <div class="text-3xl sm:text-4xl md:text-6xl opacity-80">
          <i class="fas fa-wallet"></i>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  @Input() totalBalance: number = 0;
}
