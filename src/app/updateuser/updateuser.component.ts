import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../service/consultas.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  id:number
  nombre: string;
  password: string;
  roleId: string;
  role: any;
}

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private service: ConsultasService, private auth: AuthService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: DialogData) {  }
  selectedRole?: string;
  roles: any = [];
  user: any = [];


  updateForm = this.fb.group({
    nombre: this.fb.control(this.user.nombre, Validators.required),
    password: this.fb.control(this.user.password, Validators.required),
    roleId: this.user.roleId
  })

  updateUser() {
    this.updateForm.value.roleId = this.selectedRole
    if (this.updateForm.valid) {
      this.auth.updateUser(this.updateForm.value, this.data.id).subscribe(res => {
        this.toastr.success('User updates')
        this.reloadPage()
      })
    } else {
      this.toastr.warning('Invalid form')
    }
  }

  reloadPage() {
    window.location.reload();
  }

  getRoles() {
    this.service.getAllRoles().subscribe((res: any) => {
      this.roles = res
    })
  }

  ngOnInit(): void {
    this.auth.getById(this.data.id).subscribe(data => this.user = data)
    this.getRoles()
  }
}
