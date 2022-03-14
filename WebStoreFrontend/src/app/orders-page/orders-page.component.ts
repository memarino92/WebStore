import { Component, OnInit } from '@angular/core'
import { ServiceProxy } from 'src/shared/service-proxies/service-proxies'

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  constructor(private serviceProxy: ServiceProxy) {}

  ngOnInit(): void {
    this.serviceProxy.getOrdersForUser().subscribe()
  }
}
