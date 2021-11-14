import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    public constructor(private router: Router) {}
    getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch (Error) {
          return null;
        }
      }

    public canActivate(): boolean {
        const token: any = localStorage.getItem("userToken");
        let role = this.getDecodedAccessToken(token).role;

        if(role == "Admin") {
            return true;
        }

        this.router.navigateByUrl("/login");
        return false;
    }
}
