import { Component, OnInit, Output } from '@angular/core'
import {
  ServiceProxy,
  Book,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [ServiceProxy],
})
export class SearchResultsComponent implements OnInit {
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
}
