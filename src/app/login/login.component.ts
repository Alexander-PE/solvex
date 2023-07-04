import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear()
  }

  loginForm = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  })

  login() {
    if (this.loginForm.valid) {
      this.service.getByName(this.loginForm.value.nombre).subscribe((res: any) => {
        if (this.loginForm.value.password == res.password) {
          sessionStorage.setItem('userId', res.id)
          sessionStorage.setItem('role', res.roleId)
          this.toastr.success('User logged')
          this.router.navigate([''])
        } else {
          this.toastr.error('Invalid credentials')
        }
      })
    } else {
      this.toastr.warning('Invalid form')
    }
  }
}
