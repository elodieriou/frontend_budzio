import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export abstract class AbstractAuthComponent {
    /**
     * True if show password
     */
    isShowPassword: boolean = false;

    protected constructor(protected userService: UserService,
                          protected messageService: MessageService,
                          protected router: Router,
                          protected route: ActivatedRoute,
                          protected authService: AuthService) {
    }

    /**
     * Toggle display password
     */
    toggleDisplayPassword() {
        this.isShowPassword = !this.isShowPassword;
    }

    /**
     * On close toast
     */
    onCloseToast() {
        this.onNavigateToLogin();
    }

    /**
     * On navigate to login screen
     */
    onNavigateToLogin() {
        this.router.navigate(['/auth/login']);
    }
}
