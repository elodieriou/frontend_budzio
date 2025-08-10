import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthStorageService } from '../services/auth-storage.service';
import { AuthService } from '../services/auth.service';
import { response } from 'express';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router,
                private readonly authStorageService: AuthStorageService) { }

    /**
     * Can activate route
     */
    async canActivate(): Promise<boolean> {
        const auth = await this.authStorageService.getAuth();
        if (auth) {
            return true;
        }
        await this.router.navigate(['/auth/login']);
        return false;
    }
}
