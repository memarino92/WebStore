import { Component, Input } from '@angular/core'
import { AdminUserDTO } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() users!: AdminUserDTO[] | null
}
