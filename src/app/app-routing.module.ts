import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './service/auth.service';
import { ProductComponent } from './product/product.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { UserComponent } from './user/user.component';
import { NewuserComponent } from './newuser/newuser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { ProductentryComponent } from './productentry/productentry.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [() => inject(AuthService).securitySession()]},
  {path: 'login', component: LoginComponent}, 
  {path: 'product/:id', component: ProductComponent, canActivate: [() => inject(AuthService).securitySessionSeller()]},
  {path: 'register', component: RegisterComponent},
  {path: 'add', component: NewproductComponent, canActivate: [() => inject(AuthService).securitySessionSeller()]},
  {path: 'add/:id', component: ProductentryComponent, canActivate: [() => inject(AuthService).securitySessionSeller()]},
  {path: 'products', component: UserproductsComponent, canActivate: [() => inject(AuthService).securitySessionSeller()]},
  {path: 'users', component: UserComponent, canActivate: [() => inject(AuthService).securitySessionAdmin()]},
  {path: 'users/:id', component: UpdateuserComponent, canActivate: [() => inject(AuthService).securitySessionAdmin()]},
  {path: 'newuser', component: NewuserComponent, canActivate: [() => inject(AuthService).securitySessionAdmin()]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
