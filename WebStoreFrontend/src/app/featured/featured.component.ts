import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  ServiceProxy,
  BookDTO,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css'],
  providers: [ServiceProxy],
})
export class FeaturedComponent {
  books$: Observable<BookDTO[]>

  constructor(private serviceProxy: ServiceProxy) {
    this.books$ = this.serviceProxy
      .getAllBooks()
      .pipe(map((books) => shuffleArray(books)))
  }
}

function shuffleArray(array: any[]): any[] {
  let newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}
