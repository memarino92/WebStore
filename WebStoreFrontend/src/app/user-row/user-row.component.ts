import { Component, Input } from '@angular/core'
import {
  AdminUserDTO,
  ServiceProxy,
  UpdateUserPasswordDTO,
} from 'src/shared/service-proxies/service-proxies'

@Component({
  // Using attribute selector for tr element is fine
  // eslint-disable-next-line
  selector: '[user-tr]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent {
  @Input() user!: AdminUserDTO
  @Input() index!: number
  newPassword: string = ''

  constructor(private _serviceProxy: ServiceProxy) {}

  saveChanges() {
    console.log(`New Password: ${this.newPassword}`)
    if (!this.user.userName || !this.newPassword) return
    const updateUserPasswordDTO = new UpdateUserPasswordDTO({
      userName: this.user.userName,
      password: this.newPassword,
    })
    this._serviceProxy.updateUserPassword(updateUserPasswordDTO).subscribe()
  }
}
