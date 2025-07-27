import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { PasswordValidator } from '../../validators/password.validators';
import { AbstractAuthComponent } from '../abstract-auth.component';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bdz-login',
    imports: [Button, FormsModule, IftaLabel, InputText, ReactiveFormsModule, NgClass],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent extends AbstractAuthComponent {
    /**
     * Login form
     */
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, PasswordValidator.strongPassword]),
    });

    constructor(userService: UserService,
                messageService: MessageService,
                router: Router,
                route: ActivatedRoute,
                authService: AuthService,) {
        super(userService,
            messageService,
            router,
            route,
            authService,);
    }

    /**
     * Getter email control
     */
    get email() {
        return this.loginForm.get('email');
    }

    /**
     * Getter password control
     */
    get password() {
        return this.loginForm.get('password');
    }

    /**
     * Getter required password control
     */
    get required() {
        return this.password?.errors?.['required'];
    }

    /**
     * Getter weak password control
     */
    get weakPassword() {
        return this.password?.errors?.['weakPassword'];
    }

    /**
     * Forgot password
     */
    forgotPassword() {
        this.router.navigate(['/auth/request-password-reset']);
    }

    /**
     * On login
     */
    onLogin() {

    }

    /**
     * On navigating to signup screen
     */
    onNavigateToSignup() {
        this.router.navigate(['/auth/signup']);
    }
}
