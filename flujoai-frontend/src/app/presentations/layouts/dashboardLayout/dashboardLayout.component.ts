import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SidebarMenuItemComponent } from '@app/presentations/components/sidebarMenuItem/sidebarMenuItem.component';
import { AuthService } from '@services/AuthService.service';

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

    constructor(private authService: AuthService) {
        console.log('Rutas del dashboard:', routes[1].children);
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen.update(value => !value);
    }

    onMenuItemClick() {
        if (window.innerWidth < 1024) {
            this.isMobileMenuOpen.set(false);
        }
    }

    logout() {
        this.authService.logout();
    }

    public routes = routes[1].children?.filter((route) => route.data);
}
