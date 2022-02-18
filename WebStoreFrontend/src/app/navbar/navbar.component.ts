import { Component, Input } from '@angular/core'
import { SearchService } from '../search.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchParams: string = ''

  constructor(private angularSearchService: SearchService) {}

  updateSearchParams() {
    this.angularSearchService.updateSearchParams(this.searchParams)
  }
}
