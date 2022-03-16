import { Component, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  ServiceProxy,
  Book,
  AdminUserDTO,
  CreateUserDTO,
  CreateBookDTO,
} from '../../shared/service-proxies/service-proxies'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ServiceProxy],
})
export class AdminPageComponent {
  books$!: Observable<CreateBookDTO[]>
  users$!: Observable<AdminUserDTO[]>
  saveBookEventSubject: Subject<void> = new Subject<void>()
  saveUserEventSubject: Subject<void> = new Subject<void>()

  constructor(private serviceProxy: ServiceProxy) {
    this.books$ = this.serviceProxy.getBooksForAdmin()
    this.users$ = this.serviceProxy.getAllUsers()
  }

  createBook(book: Book) {
    let newBook = new CreateBookDTO(book)

    this.serviceProxy.createBook(newBook).subscribe(() => {
      this.books$ = this.books$.pipe(map((books) => books))
    })
  }

  saveChanges() {
    this.saveBookEventSubject.next()
  }

  saveUser() {
    this.saveUserEventSubject.next()
  }

  createUser(data: CreateUserDTO) {
    this.serviceProxy.createUser(data).subscribe(() => {
      this.users$ = this.users$.pipe(map((users) => users))
    })
  }
}
