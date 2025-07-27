import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validators';
import { Button } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AbstractAuthComponent } from '../abstract-auth.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bdz-reset-password',
    imports: [
        Button,
        IftaLabel,
        InputText,
        ReactiveFormsModule,
        NgClass,
        Toast,
    ],
    providers: [MessageService],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent extends AbstractAuthComponent implements  OnInit {
    /**
     * Reset password form
     */
    resetPasswordForm = new FormGroup(
        {
        newPassword: new FormControl('', [Validators.required, PasswordValidator.strongPassword]),
        confirmPassword: new FormControl('', [Validators.required, PasswordValidator.strongPassword]),
        },
        {
            validators: [this.passwordsMatch]
        });

    /**
     * True if show new password
     */
    isShowNewPassword: boolean = false;

    /**
     * True if show confirm password
     */
    isShowConfirmPassword: boolean = false;

    /**
     * User token
     */
    token: string | null = null;

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
     * On init component
     */
    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.token = params.get('token');
        });
    }

    /**
     * Getter new password control
     */
    get newPassword() {
        return this.resetPasswordForm.get('newPassword');
    }

    /**
     * Getter confirm password control
     */
    get confirmPassword() {
        return this.resetPasswordForm.get('confirmPassword');
    }

    /**
     * Getter required new password control
     */
    get required() {
        return this.newPassword?.errors?.['required'];
    }

    /**
     * Getter weak password control
     */
    get weakPassword() {
        return this.newPassword?.errors?.['weakPassword'];
    }

    /**
     * Toggle display new password
     */
    toggleDisplayNewPassword() {
        this.isShowNewPassword = !this.isShowNewPassword;
    }

    /**
     * Toggle display confirm password
     */
    toggleDisplayConfirmPassword() {
        this.isShowConfirmPassword = !this.isShowConfirmPassword;
    }

    /**
     * Passwords match
     * @param control - Control
     */
    passwordsMatch(control: AbstractControl) {
        return control.get('newPassword')?.value === control.get('confirmPassword')?.value ? null : { passwordMismatch: true };
    }

    /**
     * On reset password
     */
    onResetPassword() {
        this.authService.updatePasswordReset(this.token, this.confirmPassword?.value).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
        })
    }
}
