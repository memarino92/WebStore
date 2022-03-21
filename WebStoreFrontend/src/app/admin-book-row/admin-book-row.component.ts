import { Component, Input, OnInit } from '@angular/core'
import { CreateBookDTO } from 'src/shared/service-proxies/service-proxies'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { imageNameFromUrl } from 'src/shared/utils/utils'
import { ServiceProxy } from '../../shared/service-proxies/service-proxies'
import { Subject } from 'rxjs'
import * as mdb from 'mdb-ui-kit' // lib

const FALLBACK_IMAGE_URL = `https://res.cloudinary.com/mmarino/image/upload/v1644550847/SimpleBook_h6isa6.svg`

@Component({
  // Using attribute selector for tr element is fine
  // eslint-disable-next-line
  selector: '[admin-book-tr]',
  templateUrl: './admin-book-row.component.html',
  styleUrls: ['./admin-book-row.component.css'],
})
export class AdminBookRowComponent implements OnInit {
  @Input() book!: CreateBookDTO
  @Input() index!: number
  saveBookEventSubject: Subject<void> = new Subject<void>()

  img!: CloudinaryImage

  constructor(private _serviceProxy: ServiceProxy) {}

  ngOnInit(): void {
    const bookImageUrl = this.book.imageUrl
      ? this.book.imageUrl
      : FALLBACK_IMAGE_URL

    const myCld = new Cloudinary({ cloud: { cloudName: 'mmarino' } })
    this.img = myCld
      .image(imageNameFromUrl(bookImageUrl))
      .resize(thumbnail().width(50).height(50))
  }

  deleteBook() {
    this._serviceProxy.deleteBook(this.book.bookId).subscribe()
  }

  saveChanges() {
    this.saveBookEventSubject.next()
  }

  updateBook(book: CreateBookDTO) {
    this._serviceProxy.updateBook(book).subscribe((result) => {
      const modal = new mdb.Modal(
        document.getElementById(`editBook${this.book.bookId}Modal`)
      )
      modal.hide()
      this.book = result
    })
  }

  openEditBookModal() {
    const modal = new mdb.Modal(
      document.getElementById(`editBook${this.book.bookId}Modal`)
    )
    modal.show()
  }
}
