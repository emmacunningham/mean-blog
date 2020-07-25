import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/* Angular 8 components */
import { AddBlogComponent } from "./components/add-blog/add-blog.component";
import { BlogsListComponent } from "./components/blogs-list/blogs-list.component";

/* Angular material */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/* Angular 8 http service */
import { HttpClientModule } from "@angular/common/http";

/* Angular 8 CRUD services */
import { ApiService } from "./shared/api.service";

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* Font awesome for icons */
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, AddBlogComponent, BlogsListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
