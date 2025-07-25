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
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bdz-login',
    imports: [Button, FormsModule, IftaLabel, InputText, ReactiveFormsModule, NgClass],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    /**
     * Login form
     */
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, PasswordValidator.strongPassword]),
    });

    /**
     * True if show password
     */
    isShowPassword: boolean = false;

    constructor(private readonly authService: AuthService) {
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
     * Toggle display password
     */
    toggleDisplayPassword() {
        this.isShowPassword = !this.isShowPassword;
    }

    /**
     * Forgot password
     */
    forgotPassword() {
        this.authService.setRequestPasswordReset(true);
    }

    /**
     * On login
     */
    onLogin() {}
}
