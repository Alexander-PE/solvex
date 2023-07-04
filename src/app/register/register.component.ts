import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear()
   }

  registerForm = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    roleId: 2
  })

  register() {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(res => { 
        console.log(res)
        this.toastr.success('User registered, If you want to be a seller contact with the admin')
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('Invalid form')
    }
  }
}
