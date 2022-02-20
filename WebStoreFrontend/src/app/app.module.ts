import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { environment } from 'src/environments/environment'
import { API_BASE_URL } from 'src/shared/service-proxies/service-proxies'

import { AppComponent } from './app.component'
import { NavbarComponent } from 'src/app/navbar/navbar.component'
import { NavLinksComponent } from 'src/app/nav-links/nav-links.component'
import { CarouselComponent } from 'src/app/carousel/carousel.component'
import { CategoriesComponent } from 'src/app/categories/categories.component'
import { FeaturedComponent } from 'src/app/featured/featured.component'
import { FooterComponent } from 'src/app/footer/footer.component'
import { HomeComponent } from './home/home.component'
import { SearchComponent } from './search/search.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { BookListComponent } from './book-list/book-list.component'
import { FormsModule } from '@angular/forms'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { BooksTableComponent } from './books-table/books-table.component'
import { CloudinaryModule } from '@cloudinary/ng';
import { BookRowComponent } from './book-row/book-row.component';
import { BookCardComponent } from './book-card/book-card.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavLinksComponent,
    CarouselComponent,
    CategoriesComponent,
    FeaturedComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    SearchResultsComponent,
    BookListComponent,
    AdminPageComponent,
    BooksTableComponent,
    BookRowComponent,
    BookCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CloudinaryModule,
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useFactory: () => environment.API_BASE_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
