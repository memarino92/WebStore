import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { BookDTO } from 'src/shared/service-proxies/service-proxies'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Observable string sources
  private cartItemsSource = new Subject<BookDTO[]>()

  // Observable string streams
  cartItems$ = this.cartItemsSource.asObservable()

  // Service message commands
  updateCartItems(books: BookDTO[]) {
    this.cartItemsSource.next(books)
  }
}
