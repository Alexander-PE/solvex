import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {

  constructor(public fb: FormBuilder, private toastr: ToastrService, private service: ConsultasService, private auth: AuthService, private router: Router) {}
  selectedRole?: string;
  roles: any = [];

  newForm = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    roleId: ''
  })

  addUser() {
    if (this.newForm.valid) {
      this.newForm.value.roleId = this.selectedRole
      this.auth.register(this.newForm.value).subscribe(res => {
        this.toastr.success('User registered')
        this.router.navigate(['users'])
      })
    } else {
      this.toastr.warning('Invalid form')
    }
  }

  getRoles() {
    this.service.getAllRoles().subscribe((res: any) => {
      this.roles = res
    })
  }

  ngOnInit(): void {
    this.getRoles()
  }

}
