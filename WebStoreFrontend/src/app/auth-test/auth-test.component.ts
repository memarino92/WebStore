import { Component, OnInit } from '@angular/core'
import { OidcSecurityService } from 'angular-auth-oidc-client'

@Component({
  selector: 'app-auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.css'],
})
export class AuthTestComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData }) => {
        console.log('is authenticated', isAuthenticated)
        console.log('userData', userData)
      })
  }

  login() {
    this.oidcSecurityService.authorize()
  }

  logout() {
    this.oidcSecurityService.logoff()
  }
}
