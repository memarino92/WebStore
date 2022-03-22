import { Component, Input, OnInit } from '@angular/core'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { imageNameFromUrl } from 'src/shared/utils/utils'
import {
  BookDTO,
  CreateCartItemDTO,
} from 'src/shared/service-proxies/service-proxies'
import {
  AuthenticatedResult,
  OidcSecurityService,
} from 'angular-auth-oidc-client'
import { ServiceProxy } from 'src/shared/service-proxies/service-proxies'
import { CartService } from '../cart.service'
import { Observable } from 'rxjs'

const FALLBACK_IMAGE_URL = `https://res.cloudinary.com/mmarino/image/upload/v1644550847/SimpleBook_h6isa6.svg`

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book!: BookDTO
  isAuthenticated$: Observable<AuthenticatedResult>

  img!: CloudinaryImage

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private serviceProxy: ServiceProxy,
    private cartService: CartService
  ) {
    this.isAuthenticated$ = oidcSecurityService.isAuthenticated$
  }

  ngOnInit(): void {
    const bookImageUrl = this.book.imageUrl
      ? this.book.imageUrl
      : FALLBACK_IMAGE_URL

    const myCld = new Cloudinary({ cloud: { cloudName: 'mmarino' } })
    this.img = myCld
      .image(imageNameFromUrl(bookImageUrl))
      .resize(thumbnail().width(130).height(160))
  }

  addBookToCart() {
    this.serviceProxy
      .addItemToCart(
        new CreateCartItemDTO({
          bookId: this.book.bookId,
        })
      )
      .subscribe((result) => this.cartService.updateCartItems(result))
  }
}
