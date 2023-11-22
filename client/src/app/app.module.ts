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
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthInterceptorComponent } from './auth-interceptor/auth-interceptor.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { ToastModule } from 'primeng/toast';
import{ BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    AuthInterceptorComponent,
    AuthGuardComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DividerModule,
    InputTextModule,HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide:[HTTP_INTERCEPTORS],
    useClass: AuthInterceptorComponent,
    multi: true
  },MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
