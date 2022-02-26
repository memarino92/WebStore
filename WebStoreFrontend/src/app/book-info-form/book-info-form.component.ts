import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { ImageUploadComponent } from 'src/app/image-upload/image-upload.component'
import { Book } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-book-info-form',
  templateUrl: './book-info-form.component.html',
  styleUrls: ['./book-info-form.component.css'],
})
export class BookInfoFormComponent implements OnInit {
  bookInfoForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    price: new FormControl(''),
    summary: new FormControl(''),
  })

  isEdit: any
  imageUrl: string = ''

  @Output() bookInfo = new EventEmitter<Book>()
  constructor() {}

  ngOnInit(): void {
    if (this.isEdit) {
      //...
    }
  }

  addImage(string: string) {
    this.imageUrl = string
  }

  onSubmit() {
    let data = { ...this.bookInfoForm.value, imageUrl: this.imageUrl }

    this.bookInfo.emit(data)
  }
}
