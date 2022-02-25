import { Component, OnInit, Output } from '@angular/core'
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

  createBook() {
    let newBook = new Book()
    newBook.author = 'Another Test Author'
    newBook.title = 'Another Test Title'
    this.bookService.createBook(newBook).subscribe((result) => {
      console.log(result)
    })
  }
}
