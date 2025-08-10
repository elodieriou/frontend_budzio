import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.type';
import { UserStorageService } from './user-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    /**
     * Api url
     */
    private readonly _apiUrl = 'http://192.168.1.16:3000/user';

    /**
     * Current user connected
     */
    private _currentUser = new BehaviorSubject<User | undefined>(undefined);
    currentUser$ = this._currentUser.asObservable();

    constructor(private readonly http: HttpClient,
                private readonly userStorageService: UserStorageService) {
        this.storeCurrentUser();
    }

    /**
     * Store current user
     */
    async storeCurrentUser() {
        const userId = await this.userStorageService.getUser();
        if (userId) {
            this.getUser(+userId).subscribe({
                next: (user: User) => {
                    this._currentUser.next(user);
                }
            });
        }
    }

    /**
     * Create a user
     * @param firstname - Firstname
     * @param lastname - Lastname
     * @param email - Email
     * @param password - Password
     */
    createUser(firstname: string, lastname: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(this._apiUrl, { firstname, lastname, email, password } );
    }


    /**
     * Get user
     * @param id - User id
     */
    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this._apiUrl}/${id}`);
    }

    /**
     * Update user
     * @param user - User data
     */
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this._apiUrl}/${user.id}`, user);
    }

    /**
     * Delete user
     * @param id - User id
     */
    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${this._apiUrl}/${id}`);
    }
}
