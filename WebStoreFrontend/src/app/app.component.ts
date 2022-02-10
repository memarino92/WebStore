import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ServiceProxy, Book } from '../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceProxy],
})
export class AppComponent implements OnInit {
  books?: Book[]

  constructor(private bookService: ServiceProxy) {}
  ngOnInit(): void {
    this.getBooks()
  }
  getBooks() {
    this.bookService.books().subscribe((result) => {
      this.books = result.flatMap((i) => [i, i, i, i, i, i, i, i, i, i])
    })
  }
}
