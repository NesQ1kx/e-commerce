import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { MainComponent } from './components/main/main.component';
import { AppInterceptorProvider } from './services/http.interceptor';
import { AddShopDialogComponent } from './components/add-shop-dialog/add-shop-dialog.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ShopService } from './services/shop.service';
import { ShopsComponent } from './components/shops/shops.component';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    AddShopDialogComponent,
    ShopsComponent,
    AddEventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatFileInputModule,
  ],
  providers: [ApiService, AuthService, AppInterceptorProvider, ShopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
