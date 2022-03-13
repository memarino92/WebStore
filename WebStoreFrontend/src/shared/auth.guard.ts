import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router'

import { OidcSecurityService } from 'angular-auth-oidc-client'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUserData = this.authenticationService.getUserData()

  constructor(private authenticationService: OidcSecurityService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.currentUserData) {
      // check if route is restricted by role
      if (
        route.data.roles &&
        route.data.roles.indexOf(this.currentUserData.role) === -1
      ) {
        // role not authorised
        return false
      }

      // authorised so return true
      return true
    }

    // not logged in
    return false
  }
}
