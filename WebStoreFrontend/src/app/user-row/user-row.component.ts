import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: '[user-tr]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent implements OnInit {
  @Input() user!: User
  @Input() index!: number

  constructor() {}

  ngOnInit(): void {}
}
