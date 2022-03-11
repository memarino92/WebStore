import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminBooksTableComponent } from './admin-books-table.component'

describe('AdminBooksTableComponent', () => {
  let component: AdminBooksTableComponent
  let fixture: ComponentFixture<AdminBooksTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBooksTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBooksTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
