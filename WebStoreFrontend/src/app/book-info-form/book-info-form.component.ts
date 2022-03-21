import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import {
  BookDTO,
  CreateBookDTO,
} from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-book-info-form',
  templateUrl: './book-info-form.component.html',
  styleUrls: ['./book-info-form.component.css'],
})
export class BookInfoFormComponent implements OnInit, OnDestroy {
  @Input() book?: CreateBookDTO

  private eventsSubscription!: Subscription
  @Input() events!: Observable<void>

  bookInfoForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    cost: new FormControl(''),
    markup: new FormControl(''),
    category: new FormControl(''),
  })

  imageUrl: string | undefined = ''

  @Output() bookInfo = new EventEmitter<BookDTO>()
  constructor() {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.onSubmit()
    })
    if (this.book) {
      this.bookInfoForm.controls.title.setValue(this.book.title)
      this.bookInfoForm.controls.author.setValue(this.book.author)
      this.bookInfoForm.controls.cost.setValue(this.book.cost)
      this.bookInfoForm.controls.markup.setValue(this.book.markup)
      this.bookInfoForm.controls.category.setValue(this.book.category)
      this.imageUrl = this.book.imageUrl
    }
  }

  addImage(string: string) {
    this.imageUrl = string
  }

  onSubmit() {
    let data = {
      ...this.bookInfoForm.value,
      imageUrl: this.imageUrl,
      bookId: this.book?.bookId,
    }

    this.bookInfo.emit(data)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.eventsSubscription.unsubscribe()
  }
}
