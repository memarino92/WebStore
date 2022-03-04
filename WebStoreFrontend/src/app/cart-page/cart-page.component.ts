import { Component, OnInit } from '@angular/core'
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
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    this.serviceProxy.cartItemsAll().subscribe((result) => {
      console.log(result)
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
}
