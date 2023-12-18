import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: TokenService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })

    const req = next.handle(request);

    /*req.subscribe(() => {
    }, (error: any) => {
        if (error instanceof HttpErrorResponse && (error as HttpErrorResponse).status === 401)
        this.auth.logOut();
        //this.router.navigate(['/login']);
    });*/

    return req;
  }
}
