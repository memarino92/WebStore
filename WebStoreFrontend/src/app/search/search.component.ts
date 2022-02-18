import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ServiceProxy } from '../../shared/service-proxies/service-proxies'
import { SearchService } from '../search.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ServiceProxy, SearchService],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchParams: string = ''
  subscription: Subscription

  constructor(
    private apiSearchService: ServiceProxy,
    private angularSearchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.subscription = angularSearchService.searchParams$.subscribe(
      (searchParams) => {
        this.searchParams = searchParams
        this.getSearchResults()
      }
    )
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchParams = params['searchParams']
    })
    this.getSearchResults()
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }

  getSearchResults() {
    this.apiSearchService.search(this.searchParams).subscribe((result) => {
      this.angularSearchService.updateSearchResults(result)
    })
  }
}
