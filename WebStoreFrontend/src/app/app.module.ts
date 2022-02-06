import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'
import { API_BASE_URL } from 'src/shared/service-proxies/service-proxies'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: API_BASE_URL,
      useFactory: () => environment.API_BASE_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
