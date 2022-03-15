import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Book } from 'src/shared/service-proxies/service-proxies'
import { SearchService } from '../search.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  searchResults$: Observable<Book[]>

  constructor(private angularSearchService: SearchService) {
    this.searchResults$ = angularSearchService.searchResults$
  }
}
