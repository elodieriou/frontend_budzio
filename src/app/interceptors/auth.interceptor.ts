import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AuthStorageService } from '../services/auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authStorageService: AuthStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authStorageService.getAuth()).pipe(
            switchMap(authToken => {
                const authReq = authToken
                    ? req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
                    })
                    : req;

                return next.handle(authReq);
            })
        );
    }
}
