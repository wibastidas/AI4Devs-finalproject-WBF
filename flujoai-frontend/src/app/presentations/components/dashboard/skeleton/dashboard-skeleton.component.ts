import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-8 animate-pulse">
      <!-- Header Skeleton -->
      <div class="bg-gray-200 rounded-3xl p-6 h-40"></div>

      <!-- Stats Skeleton -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="bg-gray-200 rounded-3xl p-6 h-32"></div>
        <div class="bg-gray-200 rounded-3xl p-6 h-32"></div>
      </div>

      <!-- Categories and Accounts Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-gray-200 rounded-3xl p-6 h-96"></div>
        <div class="bg-gray-200 rounded-3xl p-6 h-96"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSkeletonComponent {}