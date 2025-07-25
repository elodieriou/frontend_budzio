import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { LoginComponent } from '../login/login.component';
import { RequestPasswordResetComponent } from '../request-password-reset/request-password-reset.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bdz-auth',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        MessageModule,
        LoginComponent,
        RequestPasswordResetComponent
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
    /**
     * True if request password reset
     */
    isRequestPasswordReset: boolean = false;

    constructor(private readonly authService: AuthService) {
    }

    /**
     * On init component
     */
    ngOnInit() {
        this.authService.requestPasswordReset$.subscribe({
            next: (requestPasswordReset) => {
                this.isRequestPasswordReset = requestPasswordReset;
            }
        });
    }
}
