import { Component, Input } from '@angular/core'
import { Book } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css'],
})
export class BooksTableComponent {
  @Input() books?: Book[]

  constructor() {}
}
