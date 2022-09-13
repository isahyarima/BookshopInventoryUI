import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.isLoggedIn) {
            return true;
        } else {
            // To redirect to the page user is after login
            this.auth.redirectUrl = url;
            // Navigate to the login page with extras
            this.router.navigate(["/auth/login"],{ queryParams: { returnUrl: url }});
            return false;
        }
    }
}

// //Redirect user to original url after login in asp net core
