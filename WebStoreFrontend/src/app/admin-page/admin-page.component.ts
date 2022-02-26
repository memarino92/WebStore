import { Component, OnInit, Output } from '@angular/core'
import { BookInfoFormComponent } from 'src/app/book-info-form/book-info-form.component'
import {
  ServiceProxy,
  Book,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ServiceProxy],
})
export class AdminPageComponent implements OnInit {
  @Output() books?: Book[]

  constructor(private bookService: ServiceProxy) {}

  ngOnInit(): void {
    this.getBooks()
  }
  getBooks() {
    this.bookService.books().subscribe((result) => {
      this.books = result
    })
  }

  createBook(book: Book) {
    let newBook = new Book(book)

    this.bookService.createBook(newBook).subscribe((result) => {
      console.log(result)
    })
  }
}
