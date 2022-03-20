import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ServiceProxy } from '../../shared/service-proxies/service-proxies'
import { SearchService } from '../search.service'

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit {
  category: string | null = ''

  constructor(
    private route: ActivatedRoute,
    private serviceProxy: ServiceProxy,
    private angularSearchService: SearchService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')
    this.getBooksInCategory()
  }

  getBooksInCategory() {
    if (!this.category) return

    this.serviceProxy.getBooksByCategory(this.category).subscribe((result) => {
      this.angularSearchService.updateSearchResults(result)
    })
  }
}
