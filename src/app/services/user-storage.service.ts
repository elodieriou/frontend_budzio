import { Injectable } from '@angular/core';
import localforage from 'localforage';

@Injectable({
    providedIn: 'root'
})
export class UserStorageService {
    /**
     * Storage instance
     * @private
     */
    private store: LocalForage;

    constructor() {
        this.store = localforage.createInstance({
            name: 'budzio',
            storeName: 'userStore'
        });
    }

    /**
     * Set user storage
     * @param user - User id
     */
    async setUser(user: string): Promise<void> {
        await this.store.setItem('userId', user);
    }

    /**
     * Get user storage
     */
    async getUser(): Promise<string | null> {
        return await this.store.getItem('userId');
    }

    /**
     * Remove user storage
     */
    async removeUser(): Promise<void> {
        await this.store.removeItem('userId');
    }
}
