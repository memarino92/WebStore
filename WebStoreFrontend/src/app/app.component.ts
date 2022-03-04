import { Component, OnInit } from '@angular/core'
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
    public cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    this.serviceProxy.cartItemsAll().subscribe((result) => {
      this.cartItems = result
      this.cartService.updateCartItems(result)
    })
  }
}
