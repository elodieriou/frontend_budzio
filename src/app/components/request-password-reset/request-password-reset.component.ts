import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AbstractAuthComponent } from '../abstract-auth.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bdz-request-password-reset',
    imports: [
        ReactiveFormsModule,
        IftaLabel,
        InputText,
        Button,
        Toast
    ],
    providers: [MessageService],
    templateUrl: './request-password-reset.component.html',
    styleUrl: './request-password-reset.component.scss'
})
export class RequestPasswordResetComponent extends AbstractAuthComponent {
    /**
     * Request a password reset form
     */
    requestPasswordResetForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
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
        return this.requestPasswordResetForm.get('email');
    }

    /**
     * On send email
     */
    onSendEmail() {
        this.authService.createRequestPasswordReset(this.email?.value).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            }
        });
    }
}
