import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'

import { OidcSecurityService } from 'angular-auth-oidc-client'
import { RolesDTO, ServiceProxy } from './service-proxies/service-proxies'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUserData = this.authenticationService.getUserData()
  roles?: string[]

  constructor(
    private router: Router,
    private authenticationService: OidcSecurityService,
    private serviceProxy: ServiceProxy
  ) {
    this.getRolesAsync()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getRolesAsync()
    if (this.currentUserData) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(this.roles) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/'])
        return false
      }

      // authorised so return true
      return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false
  }

  private getRolesAsync() {
    console.log('getting roles!')
    let username = this.currentUserData.preferred_username
    if (!username) return

    this.serviceProxy.getRolesForUser(username).subscribe((result) => {
      console.log(result)
      this.roles = result?.roles
    })
  }
}
