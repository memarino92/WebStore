import { Component, OnInit } from '@angular/core'
import { SearchService } from '../search.service'
import { Router } from '@angular/router'
import { OidcSecurityService } from 'angular-auth-oidc-client'
import { CartService } from '../cart.service'
import { BookDTO } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchParams: string = ''
  userIsAuthenticated!: boolean
  userData!: any
  cartItems!: BookDTO[]

  constructor(
    private angularSearchService: SearchService,
    private router: Router,
    public cartService: CartService,
    public oidcSecurityService: OidcSecurityService
  ) {
    cartService.cartItems$.subscribe((result) => (this.cartItems = result))
  }
  ngOnInit(): void {
    this.userData = this.oidcSecurityService.getUserData()
    // console.log('user data from navbar', this.userData)
    this.userIsAuthenticated = this.oidcSecurityService.isAuthenticated()
    // console.log('is authenticated from navbar', this.userIsAuthenticated)
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

  getCartItems() {}
}
