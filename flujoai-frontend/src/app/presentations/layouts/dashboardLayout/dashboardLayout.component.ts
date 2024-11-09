import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SidebarMenuItemComponent } from '@app/presentations/components/sidebarMenuItem/sidebarMenuItem.component';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SidebarMenuItemComponent,
    ],
    templateUrl: './dashboardLayout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
    isMobileMenuOpen = signal(false);

    toggleMobileMenu() {
        this.isMobileMenuOpen.update(value => !value);
    }

    onMenuItemClick() {
        if (window.innerWidth < 1024) { // 1024px es el breakpoint 'lg' en Tailwind
            this.isMobileMenuOpen.set(false);
        }
    }

    constructor() {
        console.log('Rutas del dashboard:', routes[1].children);
    }

    public routes = routes[1].children?.filter((route) => route.data);
}
