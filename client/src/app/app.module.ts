import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NewPostComponent } from './new-post/new-post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import {HttpClientModule} from '@angular/common/http';
import { EditorModule } from 'primeng/editor';
import { UserBlogDetailsComponent } from './user-blog-details/user-blog-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserDashboardComponent,
    NewPostComponent,
  HomepageComponent,
  BlogListComponent,
  BlogDetailsComponent,
    SignupComponent,
    UserBlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DividerModule,
    InputTextModule,
    ButtonModule,
HttpClientModule,

    ReactiveFormsModule,
    EditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
