import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core'
import {
  ServiceProxy,
  Book,
} from '../../shared/service-proxies/service-proxies'
import { SearchService } from '../search.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ServiceProxy, SearchService],
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
  searchParams: string = ''
  subscription: Subscription

  constructor(
    private apiSearchService: ServiceProxy,
    private angularSearchService: SearchService
  ) {
    this.subscription = angularSearchService.searchParams$.subscribe(
      (searchParams) => {
        this.searchParams = searchParams
        this.getSearchResults()
      }
    )
  }

  ngOnInit(): void {
    this.getSearchResults()
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }

  ngOnChanges() {
    this.getSearchResults()
  }

  getSearchResults() {
    this.apiSearchService.search(this.searchParams).subscribe((result) => {
      this.angularSearchService.updateSearchResults(result)
    })
  }
}
