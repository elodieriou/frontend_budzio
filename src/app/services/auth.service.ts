import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginType } from '../models/login.type';
import { isPlatformBrowser } from '@angular/common';
import { ResetPasswordResponseType } from '../models/reset-password-response.type';
import { Router } from '@angular/router';
import { UserStorageService } from './user-storage.service';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**
     * Api url
     */
    private readonly _apiUrl = 'http://192.168.1.16:3000/auth';

    /**
     * Platform id
     */
    private readonly _platformId = inject(PLATFORM_ID);

    /**
     * Http client
     */
    private readonly _http = inject(HttpClient);

    /**
     * Observable is logged in
     */
    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn.asObservable();

    constructor(private readonly router: Router,
                private readonly userStorageService: UserStorageService,
                private readonly authStorageService: AuthStorageService) {
        this.checkToken();
    }

    /**
     * Check token
     */
    async checkToken() {
        const hasToken = await this.hasToken();
        this._isLoggedIn.next(hasToken);
    }

    /**
     * True if browser
     * @private
     */
    private isBrowser(): boolean {
        return isPlatformBrowser(this._platformId);
    }

    /**
     * Login
     * @param email - Email
     * @param password - Password
     */
    login(email: string, password: string): Observable<LoginType> {
        return this._http.post<LoginType>(`${this._apiUrl}/login`, { email, password }).pipe(
            switchMap(response => {
                if (this.isBrowser()) {
                    return from(this.authStorageService.setAuth(response.access_token)).pipe(
                        tap(() => {
                            this._isLoggedIn.next(true);
                        }),
                        switchMap(() => [response])
                    );
                } else {
                    this._isLoggedIn.next(true);
                    return [response];
                }
            })
        );
    }

    /**
     * Logout
     */
    logout() {
        if (this.isBrowser()) {
            forkJoin([
                from(this.authStorageService.removeAuth()),
                from(this.userStorageService.removeUser())
            ]).subscribe({
                next: () => {
                    this._isLoggedIn.next(false);
                    this.router.navigate(['/auth/login']);
                }
            })
        }
    }

    /**
     * Local storage has token
     * @private
     */
    private async hasToken(): Promise<boolean> {
        if (!this.isBrowser()) {
            return false;
        }
        const auth = await this.authStorageService.getAuth();
        return !!auth;
    }

    /**
     * Create request to reset password
     * @param email - User email
     */
    createRequestPasswordReset(email: string | undefined | null): Observable<ResetPasswordResponseType> {
        return this._http.post<any>(`${this._apiUrl}/request-password-reset`, { email });
    }

    /**
     * Update reset password
     * @param token - User token
     * @param newPassword - New password
     */
    updatePasswordReset(token: string | null, newPassword: string | null | undefined): Observable<ResetPasswordResponseType> {
        return this._http.patch<any>(`${this._apiUrl}/reset-password`, { token, newPassword });
    }
}
