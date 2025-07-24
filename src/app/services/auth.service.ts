import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessTokenType } from '../models/access-token.type';

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
     * Observable is logged in
     */
    isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private readonly http: HttpClient) {}

    /**
     * Login
     * @param email - Email
     * @param password - Password
     */
    login(email: string, password: string): Observable<AccessTokenType> {
        return this.http
            .post<{
                access_token: string;
            }>(`${this._apiUrl}/login`, { email, password })
            .pipe(
                tap((response) => {
                    localStorage.setItem(this._tokenKey, response.access_token);
                    this.isLoggedIn$.next(true);
                }),
            );
    }

    /**
     * Logout
     */
    logout(): void {
        localStorage.removeItem(this._tokenKey);
        this.isLoggedIn$.next(false);
    }

    /**
     * Get token
     */
    getToken(): string | null {
        return localStorage.getItem(this._tokenKey);
    }

    /**
     * Local storage has token
     * @private
     */
    private hasToken(): boolean {
        return !!localStorage.getItem(this._tokenKey);
    }
}
