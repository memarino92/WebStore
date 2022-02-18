import { Component, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { Book } from 'src/shared/service-proxies/service-proxies'
import { SearchService } from '../search.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnDestroy {
  subscription: Subscription
  @Output() searchResults?: Book[]

  constructor(private angularSearchService: SearchService) {
    this.subscription = angularSearchService.searchResults$.subscribe(
      (result) => (this.searchResults = result)
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }
}
