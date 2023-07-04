import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../service/consultas.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private service: ConsultasService, private auth: AuthService, private router: Router) { }
  selectedRole?: string;
  roles: any = [];

  updateForm = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    roleId: ''
  })

  updateUser() {
    if (this.updateForm.valid) {
      this.updateForm.value.roleId = this.selectedRole
      this.auth.updateUser(this.updateForm.value).subscribe(res => {
        this.toastr.success('User updates')
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
