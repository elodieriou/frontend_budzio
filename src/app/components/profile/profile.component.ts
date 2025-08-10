import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.type';
import { MenuMobileComponent } from '../shared/menu/menu-mobile/menu-mobile.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [
        MenuMobileComponent,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    /**
     * User
     */
    user: User | undefined;

    /**
     * True if mobile screen
     */
    isMobileScreen: boolean = true;

    constructor(protected userService: UserService,
                private readonly authService: AuthService,
                private readonly router: Router) {
    }

    /**
     * On init component
     */
    ngOnInit() {
        this.userService.currentUser$.subscribe({
            next: (user) => {
                this.user = user;
            }
        });
    }

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
    }
}
