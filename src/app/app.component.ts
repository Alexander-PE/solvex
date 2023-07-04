import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solvex';
  constructor(private service: AuthService ){}

  isLogged(){
    return this.service.isLoggedIn()
  }

  isAdmin(){
    return this.service.isAdmin()
  }

  isSeller(){
    return this.service.isSeller()
  }
}
