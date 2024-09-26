/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';  // Import this to check the platform

import { environment } from './../../../environments/environment';
import { User } from './../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: object // Inject PLATFORM_ID to detect platform
    ) {
        // Check if the platform is browser before accessing localStorage
        const userJson = isPlatformBrowser(this.platformId) ? localStorage.getItem('user') : null;
        this.userSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        console.log("user account login: ", username, password);
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                if (isPlatformBrowser(this.platformId)) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }
                this.userSubject.next(user);
                return user;
            }));
    }

    loginFromApi(payload: any) {
        return this.http.post<User>(`${environment.baseUrl}/login`, payload)
            .pipe(map(user => {
                if (isPlatformBrowser(this.platformId)) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            // remove user from local storage and set current user to null
            localStorage.removeItem('user');
        }
        this.userSubject.next(null);
        this.router.navigate(['']);
    }

    register(user: any) {
        console.log("register user: ", user);
        return this.http.post(`${environment.apiUrl}/users/register`, user);
        // return this.http.post(`${environment.baseUrl}/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                if (id === this.userValue?.id) {
                    const user = { ...this.userValue, ...params };
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                if (id === this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}