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
import { CreateUserDTO } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css'],
})
export class UserInfoFormComponent implements OnInit, OnDestroy {
  private eventsSubscription!: Subscription
  @Input() events!: Observable<void>

  userInfoForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  @Output() userInfo = new EventEmitter<CreateUserDTO>()

  constructor() {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.onSubmit()
    })
  }
  onSubmit() {
    const data = this.userInfoForm.value
    this.userInfo.emit(data)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.eventsSubscription.unsubscribe()
  }
}
