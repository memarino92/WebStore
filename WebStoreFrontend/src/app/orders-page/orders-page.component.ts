import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import {
  OrderDTO,
  ServiceProxy,
} from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  orders$: Observable<OrderDTO[]>

  constructor(private serviceProxy: ServiceProxy) {
    this.orders$ = this.serviceProxy.getOrdersForUser()
  }

  ngOnInit(): void {}
}
