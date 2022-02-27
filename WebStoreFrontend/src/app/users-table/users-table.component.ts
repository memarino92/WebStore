import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  @Input() users?: User[]
  constructor() {}

  ngOnInit(): void {}
}
