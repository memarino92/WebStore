import { Component, Input } from '@angular/core'
import { User } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() users?: User[]
}
