import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import {
  ServiceProxy,
  Book,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css'],
  providers: [ServiceProxy],
})
export class FeaturedComponent {
  books$: Observable<Book[]>

  constructor(private serviceProxy: ServiceProxy) {
    this.books$ = this.serviceProxy.books()
  }
}
