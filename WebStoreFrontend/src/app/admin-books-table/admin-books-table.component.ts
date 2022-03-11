import { Component, Input } from '@angular/core'
import { CreateBookDTO } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-admin-books-table',
  templateUrl: './admin-books-table.component.html',
  styleUrls: ['./admin-books-table.component.css'],
})
export class AdminBooksTableComponent {
  @Input() books?: CreateBookDTO[]

  constructor() {}
}
