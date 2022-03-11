import { Component, OnInit } from '@angular/core'
import { SearchService } from '../search.service'
import { Router } from '@angular/router'
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client'
import { CartService } from '../cart.service'
import { BookDTO } from 'src/shared/service-proxies/service-proxies'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchParams: string = ''
  cartItems$?: Observable<BookDTO[]>
  userData$?: Observable<UserDataResult>
  isAuthenticated = false

  constructor(
    private angularSearchService: SearchService,
    private router: Router,
    public cartService: CartService,
    public oidcSecurityService: OidcSecurityService
  ) {}
  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated
      }
    )

    this.cartItems$ = this.cartService.cartItems$
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
