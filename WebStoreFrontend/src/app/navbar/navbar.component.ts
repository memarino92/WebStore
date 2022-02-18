import { Component, Input } from '@angular/core'
import { SearchService } from '../search.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchParams: string = ''

  constructor(
    private angularSearchService: SearchService,
    private router: Router
  ) {}

  updateSearchParams() {
    this.angularSearchService.updateSearchParams(this.searchParams)
  }

  onSubmit() {
    this.updateSearchParams()
    this.router.navigate(['/search'], {
      queryParams: { searchParams: this.searchParams },
    })
  }
}
