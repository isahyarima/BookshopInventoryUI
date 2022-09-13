import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe, throwError } from 'rxjs';
import {  tap, catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RefreshTokenResultDto } from '../model/RefreshTokenResultDto';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    returnURL : any;
    
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

 constructor(private loginService : AuthenticationService,private router: Router){}

 
 addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  

    if(req.url.includes('admin_DocumentUpload/upload')){    
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    });
   }

   if(req.url.includes('api/v1/token')){ 

        
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
     
      }
    });
   }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json' ,
      //  'Access-Control-Allow-Origin': '*'
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    this.returnURL = this.router.routerState.snapshot;
    let loginResultDto = JSON.parse(localStorage.getItem('loginResultDto'));

    if (loginResultDto != '' && loginResultDto != null && loginResultDto != undefined && loginResultDto.access_token !=null) {
      
      request = this.addToken(request, loginResultDto.access_token);

    }
    
    return next.handle(request).pipe(   
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
             // this.router.navigate(['auth/login']);
              return this.handle401Error(request, next);
            default:
              throwError(error.message || error);
          }
        } else {
          return Observable.throw(error);
        }
      }) as any);
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      this.loginService.isLoggedIn = false;
      this.logoutUser();
    }
    return Observable.throw(error);
  }

  //https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      let loginResultDto = JSON.parse(localStorage.getItem('loginResultDto'));

      if (loginResultDto == null) {
        return Observable.throw("");
      }
      ////console.log('loginResultDto.refreshToken',loginResultDto);
      
      return this.loginService.refreshToken(loginResultDto.refresh_token).pipe(
        switchMap((refreshTokenResultDto: RefreshTokenResultDto) => {
                  
          if (refreshTokenResultDto.token != undefined) {
            this.tokenSubject.next(refreshTokenResultDto.token);
            return next.handle(this.addToken(req, loginResultDto.access_token));
          }
          // If we don't get a new token, we are in trouble so logout.
        this.loginService.isLoggedIn = false;
          this.logoutUser();
          return Observable.throw("");
        }),
        (catchError(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          this.loginService.isLoggedIn = false;
          this.logoutUser();
          return "";
        })) as any,
        finalize(() => {
          this.isRefreshingToken = false;
        }));
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token: string) => {
          return next.handle(this.addToken(req, token));
        }));
    }
  }
  
  logoutUser() {
    this.loginService.logout();
    this.router.navigate(['auth/login'],{ queryParams: { returnUrl: this.returnURL.url }});
  }

}
