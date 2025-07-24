import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { LoginComponent } from '../login/login.component';

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
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
})
export class AuthComponent {}
