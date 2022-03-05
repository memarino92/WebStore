import { Component, OnInit } from '@angular/core'
import { OidcSecurityService } from 'angular-auth-oidc-client'
import {
  BookDTO,
  ServiceProxy,
} from 'src/shared/service-proxies/service-proxies'
import { CartService } from '../cart.service'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  providers: [ServiceProxy],
})
export class CartPageComponent implements OnInit {
  cartItems!: BookDTO[]
  constructor(
    private serviceProxy: ServiceProxy,
    public cartService: CartService,
    private securityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    const username = this.securityService.getUserData()?.preferred_username
    if (!username) return

    this.serviceProxy.cartItemsAll(username).subscribe((result) => {
      this.cartItems = result
      this.cartService.updateCartItems(result)
    })
  }

  calculateTotal() {
    return this.cartItems?.reduce(
      (prev, cur) => (cur.price ? (prev += cur.price) : prev),
      0
    )
  }

  createOrder() {
    const username = this.securityService.getUserData()?.preferred_username
    if (!username) return

    this.serviceProxy.ordersPOST(username).subscribe()
  }
}
