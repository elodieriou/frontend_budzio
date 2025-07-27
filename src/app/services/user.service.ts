import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    /**
     * Api url
     */
    private readonly _apiUrl = 'http://localhost:3000/user';

    constructor(private readonly http: HttpClient) {}

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
