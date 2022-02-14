import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'
import { API_BASE_URL } from 'src/shared/service-proxies/service-proxies'

import { AppComponent } from './app.component'
import { NavbarComponent } from 'src/app/navbar/navbar.component'
import { NavLinksComponent } from 'src/app/nav-links/nav-links.component'
import { CarouselComponent } from 'src/app/carousel/carousel.component'
import { CategoriesComponent } from 'src/app/categories/categories.component'
import { FeaturedComponent } from 'src/app/featured/featured.component'
import { FooterComponent } from 'src/app/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavLinksComponent,
    CarouselComponent,
    CategoriesComponent,
    FeaturedComponent,
    FooterComponent,
  ],
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
