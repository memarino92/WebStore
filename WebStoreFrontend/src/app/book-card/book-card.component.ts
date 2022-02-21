import { Component, Input, OnInit } from '@angular/core'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { imageNameFromUrl } from 'src/shared/utils/utils'
import { Book } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book

  img!: CloudinaryImage

  constructor() {}

  ngOnInit(): void {
    const myCld = new Cloudinary({ cloud: { cloudName: 'mmarino' } })
    this.img = myCld
      .image(imageNameFromUrl(this.book.imageUrl))
      .resize(thumbnail().width(130).height(160))
  }
}
