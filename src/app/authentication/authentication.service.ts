import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoggedinUser } from './LoggedinUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  router: any;

  isLoggedIn: boolean = false;

  public redirectUrl: string;

  baseUrl = environment.baseUrl;
  loginStatuss: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    ) { }

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());


  loggedIn() {
    return !!localStorage.getItem('token');
  }

  login(data) {
    return this.http.post(this.baseUrl + 'login/authenticate', data);
  }

  getActivities(roleId) {
    return this.http.get(this.baseUrl + `login/activities/${roleId}/roleId`);
  }


tokenValidation(data) {
    this.redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let credentials = 'username=' + data.userName + '&password=' + data.password + '&grant_type=password';
   // this.redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //this.redirectUrl = this.redirectUrl.substring(1);
    return this.http.post<any>(this.baseUrl + 'token', credentials)
      .pipe(map(loginResultDto => {
        if (loginResultDto && loginResultDto.isAuthenticated == 'true') {
         
          localStorage.setItem('loginResultDto', JSON.stringify(loginResultDto));
          localStorage.setItem('appNameIsAuthenticated', "true");
          localStorage.setItem('token', loginResultDto.access_token);
          localStorage.setItem('idr', JSON.stringify(loginResultDto.idr));
          localStorage.setItem('idu', JSON.stringify(loginResultDto.idu));
          localStorage.setItem('racl', JSON.stringify(loginResultDto.racl));
          localStorage.setItem('name', loginResultDto.name);
          localStorage.setItem('design', loginResultDto.design);
          localStorage.setItem('role', loginResultDto.role);
          localStorage.setItem('currencyName', loginResultDto.currencyName);
          localStorage.setItem('currencySymbol', loginResultDto.currencySymbol);

          this.isLoggedIn = true;
          // if (this.redirectUrl) {
          //   ////console.log('url',this.redirectUrl);
            
          //   this.router.navigate([this.redirectUrl]);
          //   this.redirectUrl = null;
          // }

        }
        return loginResultDto;
      }));
  }
  
 
  refreshToken(refreshToken: string) {
    // call refresh!
    let credentials =  'refresh_token='+refreshToken+'&grant_type=refresh_token'
    return  this.http.post<any>(this.baseUrl + 'token', credentials)
      .pipe(map(refreshTokenResultDto => {
        // login successful if there's a jwt token in the response
        if (refreshTokenResultDto && refreshTokenResultDto.wasSuccessful) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('loginResultDto', JSON.stringify(refreshTokenResultDto));
          localStorage.setItem('appNameIsAuthenticated', "true");
          localStorage.setItem('token', refreshTokenResultDto.access_token);
          this.isLoggedIn = true;
        }
        return refreshTokenResultDto;
      }));
  }

  logout() {
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('idr');
    localStorage.removeItem('idu');
    localStorage.removeItem('idlt');
    localStorage.removeItem('activities');
    localStorage.removeItem('tenantCode');
    localStorage.removeItem('loginResultDto');
    localStorage.removeItem('appNameIsAuthenticated');
    localStorage.setItem('loginStatus', '0');
        //this.router.navigate(['auth/login']);

  }

  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
        return true;
      }
    }
    return false;
  }
  // Method to get new refresh token
  getNewRefreshToken(): Observable<any> {
    let username = localStorage.getItem('username');
    let refreshToken = localStorage.getItem('refreshToken');
    const grantType = "refresh_token";
    ////console.log('grantType',grantType);
    
    return this.http.post<any>(`${this.baseUrl}token`, { refreshToken, grantType })
      .pipe(
        map(result => {
          ////console.log('result',result);
          
          if (result && result.authToken.token) {
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('jwt', result.authToken.token);
            localStorage.setItem('username', result.authToken.username);
            localStorage.setItem('expiration', result.authToken.expiration);
            localStorage.setItem('userRole', result.authToken.roles);
            localStorage.setItem('refreshToken', result.authToken.refresh_token);
          }

          return <any>result;

        })
      );

  }


  getUserActivities() {
    return JSON.parse(window.localStorage.getItem('activities'));
  }
  
  submitCreatePassword(data) {
    return this.http.post(this.baseUrl + `application_Student/confirmation`,data);
  }

IsLinkValid(data) {
  return this.http.post(this.baseUrl + `application_Student/exist`,data);
}

PasswordSet(data) {
  return this.http.post(this.baseUrl + `login/password-reset`,data);
}

ForgotPassword(data) {
  return this.http.post(this.baseUrl + `login/forgot-password`,data);
}


submitAdmin_LoginActivityOTP(data) {
  return this.http.post(this.baseUrl + `admin_LoginActivityOTP`,data);
}
getAdmin_LoginActivityOTP() {
  return this.http.get(this.baseUrl + `admin_LoginActivityOTP`);
}
deleteAdmin_LoginActivityOTP(admin_LoginActivityOTPId) {
  return this.http.delete(this.baseUrl + `admin_LoginActivityOTP/${admin_LoginActivityOTPId}/admin_LoginActivityOTPId`);
}
updateAdmin_LoginActivityOTP(data,admin_LoginActivityOTPId) {
  return this.http.put(this.baseUrl + `admin_LoginActivityOTP/${admin_LoginActivityOTPId}/admin_LoginActivityOTPId`, data);
}

}
