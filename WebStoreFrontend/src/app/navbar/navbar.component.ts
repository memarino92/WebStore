import { Component, OnInit } from '@angular/core'
import { SearchService } from '../search.service'
import { Router } from '@angular/router'
import { OidcSecurityService } from 'angular-auth-oidc-client'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchParams: string = ''
  userIsAuthenticated!: boolean
  userData!: any

  constructor(
    private angularSearchService: SearchService,
    private router: Router,
    public oidcSecurityService: OidcSecurityService
  ) {}
  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
        console.log('is authenticated', isAuthenticated)
        console.log('userData', userData)
        this.userData = userData
        this.userIsAuthenticated = isAuthenticated
      })
  }

  updateSearchParams() {
    this.angularSearchService.updateSearchParams(this.searchParams)
  }

  onSubmit() {
    this.updateSearchParams()
    this.router.navigate(['/search'], {
      queryParams: { searchParams: this.searchParams },
    })
  }
}
