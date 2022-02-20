import { Component, OnInit } from '@angular/core'
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { imageNameFromUrl } from 'src/shared/utils/utils'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  img!: CloudinaryImage

  constructor() {}
  ngOnInit(): void {
    const myCld = new Cloudinary({ cloud: { cloudName: 'mmarino' } })
    this.img = myCld
      .image(
        imageNameFromUrl(
          'https://res.cloudinary.com/mmarino/image/upload/v1644598562/counter_at_bookstore_mhfoxb.jpg'
        )
      )
      .resize(thumbnail().width(731).height(384))
  }
}
