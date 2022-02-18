import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Book } from 'src/shared/service-proxies/service-proxies'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Observable string sources
  private searchResultsSource = new Subject<Book[]>()
  private searchParamsSource = new Subject<string>()

  // Observable string streams
  searchResults$ = this.searchResultsSource.asObservable()
  searchParams$ = this.searchParamsSource.asObservable()

  // Service message commands
  updateSearchResults(books: Book[]) {
    this.searchResultsSource.next(books)
  }

  updateSearchParams(searchParams: string) {
    this.searchParamsSource.next(searchParams)
  }
}
