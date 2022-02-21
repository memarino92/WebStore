import { Component, Input, OnInit } from '@angular/core'
import { Book } from 'src/shared/service-proxies/service-proxies'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { imageNameFromUrl } from 'src/shared/utils/utils'

@Component({
  // Using attribute selector for tr element is fine
  // eslint-disable-next-line
  selector: '[book-tr]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css'],
})
export class BookRowComponent implements OnInit {
  @Input() book!: Book
  @Input() index!: number

  img!: CloudinaryImage

  constructor() {}

  ngOnInit(): void {
    const myCld = new Cloudinary({ cloud: { cloudName: 'mmarino' } })
    this.img = myCld
      .image(imageNameFromUrl(this.book.imageUrl))
      .resize(thumbnail().width(50).height(50))
  }
}
