import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getAll() {
    return this.http.get('https://localhost:7134/api/usuario')
  }

  getById(id: any) {
    return this.http.get(`http://localhost:3000/api/usuario/${id}`)
  }

  securitySession() {
    if (this.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['login'])
      this.toastr.error('You must be logged in')
      return false
    }
  }

  securitySessionAdmin() {
    if (this.isLoggedIn()) {
      if (this.getRole() == '1') {
        return true
      } else {
        this.router.navigate([''])
        this.toastr.error('You must be logged in with an Admin account')
        return false
      }
    } else {
      this.router.navigate(['login'])
      this.toastr.error('You must be logged in')
      return false
    }
  }

  securitySessionSeller() {
    if (this.isLoggedIn()) {
      if (this.getRole() == '3') {
        return true
      } else {
        this.router.navigate([''])
        this.toastr.error('You must be logged in with a Seller account')
        return false
      }
    } else {
      this.router.navigate(['login'])
      this.toastr.error('You must be logged in')
      return false
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('userId') != null
  }

  getRole() {
    return sessionStorage.getItem('role')
  }

  getUserId() {
    return sessionStorage.getItem('userId')
  }

  getByName(nombre: any) {
    return this.http.get(`https://localhost:7134/api/usuario/nombre?nombre=${nombre}`)
  }

  register(data: any) {
    return this.http.post('https://localhost:7134/api/usuario', data)
  }

  updateUser(data: any) {
    return this.http.put('', data)
  }
}
