import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthServiceService} from '../services/auth-service.service';
import {filter, map, take} from 'rxjs/operators';
import {ToastService} from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private authService: AuthServiceService, private router: Router, private toastService: ToastService) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.ChechUser();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.canActivate(next, state);
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }


  ChechUser(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated.pipe(
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.toastService.presentToast('No es un usuario autorizado para realizar esta accion', 'warning')
          this.router.navigateByUrl('/login', {replaceUrl: true});
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
