import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminBookRowComponent } from './admin-book-row.component'

describe('AdminBookRowComponent', () => {
  let component: AdminBookRowComponent
  let fixture: ComponentFixture<AdminBookRowComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBookRowComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookRowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
