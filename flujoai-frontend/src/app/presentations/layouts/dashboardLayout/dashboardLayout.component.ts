import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    constructor() {
        console.log('Rutas del dashboard:', routes[1].children);
    }

    public routes = routes[1].children?.filter((route) => route.data);
}
