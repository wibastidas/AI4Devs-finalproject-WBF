import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './authLayout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent { }
