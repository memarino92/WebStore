import { Component, OnInit } from '@angular/core'
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
export class FeaturedComponent implements OnInit {
  books?: Book[]

  constructor(private bookService: ServiceProxy) {}

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.bookService.books().subscribe((result) => {
      this.books = shuffleArray(result)
    })
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
