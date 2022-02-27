import { Component, Input } from '@angular/core'
import { User } from 'src/shared/service-proxies/service-proxies'

@Component({
  // Using attribute selector for tr element is fine
  // eslint-disable-next-line
  selector: '[user-tr]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent {
  @Input() user!: User
  @Input() index!: number

  constructor() {}
}
