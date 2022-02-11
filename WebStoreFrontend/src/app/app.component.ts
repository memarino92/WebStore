import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ServiceProxy, Book } from '../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceProxy],
})
export class AppComponent implements OnInit {
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

  getYear() {
    return new Date().getFullYear()
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
