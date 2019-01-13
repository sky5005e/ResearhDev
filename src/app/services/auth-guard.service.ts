import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('user_id') != null &&  localStorage.getItem('user_id') !== undefined) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    
    window.localStorage.removeItem('user_id');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
