import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { environment } from 'src/environments/environment'
import {
  API_BASE_URL,
  ServiceProxy,
} from 'src/shared/service-proxies/service-proxies'

import { AppComponent } from './app.component'
import { NavbarComponent } from 'src/app/navbar/navbar.component'
import { NavLinksComponent } from 'src/app/nav-links/nav-links.component'
import { CategoriesComponent } from 'src/app/categories/categories.component'
import { FeaturedComponent } from 'src/app/featured/featured.component'
import { FooterComponent } from 'src/app/footer/footer.component'
import { HomeComponent } from './home/home.component'
import { SearchComponent } from './search/search.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { BookListComponent } from './book-list/book-list.component'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { BooksTableComponent } from './books-table/books-table.component'
import { CloudinaryModule } from '@cloudinary/ng'
import { BookRowComponent } from './book-row/book-row.component'
import { BookCardComponent } from './book-card/book-card.component'
import { AuthConfigModule } from './auth/auth-config.module'
import { ImageUploadComponent } from './image-upload/image-upload.component'
import { BookInfoFormComponent } from 'src/app/book-info-form/book-info-form.component'
import { UsersTableComponent } from './users-table/users-table.component'
import { UserRowComponent } from './user-row/user-row.component'
import { UserInfoFormComponent } from './user-info-form/user-info-form.component'
import { CartPageComponent } from './cart-page/cart-page.component'
import { TokenInterceptor } from './TokenInterceptor'
import { CategoryPageComponent } from './category-page/category-page.component'
import { AdminBooksTableComponent } from './admin-books-table/admin-books-table.component'
import { AdminBookRowComponent } from './admin-book-row/admin-book-row.component'
import { AuthGuard } from 'src/shared/auth.guard'
import { OrdersPageComponent } from './orders-page/orders-page.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    data: { roles: 'admin' },
  },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: 'categories/:category', component: CategoryPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavLinksComponent,
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
    ImageUploadComponent,
    BookInfoFormComponent,
    UsersTableComponent,
    UserRowComponent,
    UserInfoFormComponent,
    CartPageComponent,
    CategoryPageComponent,
    AdminBooksTableComponent,
    AdminBookRowComponent,
    OrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CloudinaryModule,
    AuthConfigModule,
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: API_BASE_URL,
      useFactory: () => environment.API_BASE_URL,
    },
    ServiceProxy,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
