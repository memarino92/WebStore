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
import { Book } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-book-info-form',
  templateUrl: './book-info-form.component.html',
  styleUrls: ['./book-info-form.component.css'],
})
export class BookInfoFormComponent implements OnInit, OnDestroy {
  private eventsSubscription!: Subscription
  @Input() events!: Observable<void>

  bookInfoForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    cost: new FormControl(''),
    markup: new FormControl(''),
    category: new FormControl(''),
  })

  imageUrl: string = ''

  @Output() bookInfo = new EventEmitter<Book>()
  constructor() {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.onSubmit()
    })
  }

  addImage(string: string) {
    this.imageUrl = string
  }

  onSubmit() {
    let data = { ...this.bookInfoForm.value, imageUrl: this.imageUrl }

    this.bookInfo.emit(data)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.eventsSubscription.unsubscribe()
  }
}
