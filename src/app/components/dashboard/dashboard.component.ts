import { Component } from '@angular/core';
import { MenuMobileComponent } from '../shared/menu/menu-mobile/menu-mobile.component';

@Component({
  selector: 'bdz-dashboard',
    imports: [
        MenuMobileComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    isMobileScreen: boolean = true;
}
