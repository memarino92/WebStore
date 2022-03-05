import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import {
  ServiceProxy,
  Book,
  User,
  CreateUserDTO,
  CreateBookDTO,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ServiceProxy],
})
export class AdminPageComponent implements OnInit {
  books?: Book[]
  users?: User[]
  saveBookEventSubject: Subject<void> = new Subject<void>()
  saveUserEventSubject: Subject<void> = new Subject<void>()

  constructor(private _service: ServiceProxy) {}

  ngOnInit(): void {
    this.getBooks()
  }
  getBooks() {
    this._service.books().subscribe((result) => {
      this.books = result
    })
    this._service.getAllUsers().subscribe((result) => {
      this.users = result
    })
  }

  createBook(book: Book) {
    let newBook = new CreateBookDTO(book)

    this._service.createBook(newBook).subscribe()
  }

  saveChanges() {
    this.saveBookEventSubject.next()
  }

  saveUser() {
    this.saveUserEventSubject.next()
  }

  createUser(data: CreateUserDTO) {
    this._service.createUser(data).subscribe()
  }
}
