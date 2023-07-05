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
    return this.http.get(`https://localhost:7134/api/usuario/${id}`)
  }

  securitySession() {
    if (this.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['login'])
      this.toastr.warning('You must be logged in')
      return false
    }
  }

  securitySessionAdmin() {
    if (this.isLoggedIn()) {
      if (this.getRole() == '1') {
        return true
      } else {
        this.router.navigate([''])
        this.toastr.warning('You must be logged in with an Admin account')
        return false
      }
    } else {
      this.router.navigate(['login'])
      this.toastr.warning('You must be logged in')
      return false
    }
  }

  securitySessionSeller() {
    if (this.isLoggedIn()) {
      if (this.getRole() == '3') {
        return true
      } else {
        this.router.navigate([''])
        this.toastr.warning('You must be logged in with a Seller account')
        return false
      }
    } else {
      this.router.navigate(['login'])
      this.toastr.warning('You must be logged in')
      return false
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('userId') != null
  }

  isAdmin() {
    return sessionStorage.getItem('role') == '1'
  }

  isSeller() {
    return sessionStorage.getItem('role') == '3'
  }

  getRole() {
    return sessionStorage.getItem('role')
  }

  getUserId() {
    return sessionStorage.getItem('userId')
  }

  isOwner(id: any){
    return this.getUserId() == id
  }

  getByName(nombre: any) {
    return this.http.get(`https://localhost:7134/api/usuario/nombre?nombre=${nombre}`)
  }

  register(data: any) {
    return this.http.post('https://localhost:7134/api/usuario', data)
  }

  updateUser(data: any, id: any) {
    return this.http.put(`https://localhost:7134/api/usuario/${id}`, data)
  }

  removeUser(id: any) {
    return this.http.delete(`https://localhost:7134/api/usuario/${id}`)
  }
}
