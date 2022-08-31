import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthServiceService,private toastService: ToastService)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    
      return this.authService.getRole().pipe(
        take(1), // Otherwise the Observable doesn't complete!
        map(role => {
          if (role === "user")
            return true;

            this.toastService.presentToast('No es un usuario autorizado para realizar esta accion', 'warning')
          return false;
        })
      );

  }
  
}
