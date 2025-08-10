import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'bdz-menu-mobile',
  imports: [],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {
    constructor(private readonly router: Router, private readonly authService: AuthService) {
    }

    /**
     * On navigate to profile
     */
    onNavigateToProfile() {
        this.router.navigate(['/profile']);
    }
}
