import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validators';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AbstractAuthComponent } from '../abstract-auth.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    imports: [
        ReactiveFormsModule,
        IftaLabel,
        InputText,
        Button,
        NgClass,
        Toast,
    ],
    providers: [MessageService],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent extends AbstractAuthComponent {
    /**
     * Signup form
     */
    signupForm: FormGroup = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
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
     * Getter firstname control
     */
    get firstname() {
        return this.signupForm.get('firstname');
    }

    /**
     * Getter lastname control
     */
    get lastname() {
        return this.signupForm.get('lastname');
    }

    /**
     * Getter email control
     */
    get email() {
        return this.signupForm.get('email');
    }

    /**
     * Getter password control
     */
    get password() {
        return this.signupForm.get('password');
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
     * On signup
     */
    onSignup() {
        this.userService.createUser(
            this.firstname?.value,
            this.lastname?.value,
            this.email?.value,
            this.password?.value
        ).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `${response.firstname}, votre compte est bien créé.` });
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
        })
    }
}
