import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { BookDTO } from 'src/shared/service-proxies/service-proxies'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Observable string sources
  private searchResultsSource = new Subject<BookDTO[]>()
  private searchParamsSource = new Subject<string>()

  // Observable string streams
  searchResults$ = this.searchResultsSource.asObservable()
  searchParams$ = this.searchParamsSource.asObservable()

  // Service message commands
  updateSearchResults(books: BookDTO[]) {
    this.searchResultsSource.next(books)
  }

  updateSearchParams(searchParams: string) {
    this.searchParamsSource.next(searchParams)
  }
}
