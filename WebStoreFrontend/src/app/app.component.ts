import { Component, OnInit } from '@angular/core'
import { OidcSecurityService } from 'angular-auth-oidc-client'
import {
  BookDTO,
  ServiceProxy,
} from 'src/shared/service-proxies/service-proxies'
import { CartService } from './cart.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceProxy, CartService],
})
export class AppComponent implements OnInit {
  cartItems!: BookDTO[]

  constructor(
    private serviceProxy: ServiceProxy,
    private securityService: OidcSecurityService,
    public cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    this.serviceProxy
      .cartItemsAll(this.securityService.getUserData().preferred_username)
      .subscribe((result) => {
        this.cartItems = result
        this.cartService.updateCartItems(result)
      })
  }
}
