import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-book-info-form',
  templateUrl: './book-info-form.component.html',
  styleUrls: ['./book-info-form.component.css'],
})
export class BookInfoFormComponent implements OnInit {
  bookInfoFormControl = new FormControl('')

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    //...
  }
}
