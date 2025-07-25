import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessTokenType } from '../models/access-token.type';
import { isPlatformBrowser } from '@angular/common';
import { ResetPasswordResponseType } from '../models/reset-password-response.type';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**
     * Api url
     */
    private readonly _apiUrl = 'http://localhost:3000/auth';

    /**
     * Auth token
     */
    private readonly _tokenKey = 'authToken';

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
    isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

    /**
     * Observable is request password reset
     */
    private requestPasswordReset = new BehaviorSubject<boolean>(false);
    requestPasswordReset$ = this.requestPasswordReset.asObservable();

    constructor() {}

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
    login(email: string, password: string): Observable<AccessTokenType> {
        return this._http
            .post<AccessTokenType>(`${this._apiUrl}/login`, { email, password })
            .pipe(
                tap((response) => {
                    if (this.isBrowser()) {
                        localStorage.setItem(this._tokenKey, response.access_token);
                    }
                    this.isLoggedIn$.next(true);
                }),
            );
    }

    /**
     * Logout
     */
    logout() {
        if (this.isBrowser()) {
            localStorage.removeItem(this._tokenKey);
        }
        this.isLoggedIn$.next(false);
    }

    /**
     * Get token
     */
    getToken(): string | null {
        return this.isBrowser() ? localStorage.getItem(this._tokenKey) : null;
    }

    /**
     * Local storage has token
     * @private
     */
    private hasToken(): boolean {
        return this.isBrowser() && !!localStorage.getItem(this._tokenKey);
    }

    /**
     * Set the request password reset value
     * @param requestPasswordReset - Request password reset value
     */
    setRequestPasswordReset(requestPasswordReset: boolean) {
        this.requestPasswordReset.next(requestPasswordReset);
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
