import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookInfoFormComponent } from './book-info-form.component'

describe('BookInfoFormComponent', () => {
  let component: BookInfoFormComponent
  let fixture: ComponentFixture<BookInfoFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookInfoFormComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
