import { Injectable } from '@angular/core';
import localforage from 'localforage';

@Injectable({
    providedIn: 'root'
})
export class AuthStorageService {
    /**
     * Storage instance
     * @private
     */
    private store: LocalForage;

    constructor() {
        this.store = localforage.createInstance({
            name: 'budzio',
            storeName: 'AuthStore'
        });
    }

    /**
     * Set auth token storage
     * @param token - Token
     */
    async setAuth(token: string): Promise<void> {
        await this.store.setItem('authToken', token);
    }

    /**
     * Get auth token storage
     */
    async getAuth(): Promise<string | null> {
        return await this.store.getItem('authToken');
    }

    /**
     * Remove auth token storage
     */
    async removeAuth(): Promise<void> {
        await this.store.removeItem('authToken');
    }
}
