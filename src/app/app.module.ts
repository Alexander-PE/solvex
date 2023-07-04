import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuiModule } from '../mui.module';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { UserComponent } from './user/user.component';
import { NewuserComponent } from './newuser/newuser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { AnotherproductComponent } from './anotherproduct/anotherproduct.component';
import { ProductentryComponent } from './productentry/productentry.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    NewproductComponent,
    UserComponent,
    NewuserComponent,
    UpdateuserComponent,
    UserproductsComponent,
    AnotherproductComponent,
    ProductentryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MuiModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
