import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from '../service/consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { ToastrService } from 'ngx-toastr';

export interface user {
  id: number;
  nombre: string;
  roleId: number;
  role: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private auth: AuthService, private service:ConsultasService, public dialog:MatDialog, private toastr: ToastrService) { 
    this.loadUsers()
   }

  userlist!: any[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'nombre', 'role', 'action'];
  @ViewChild('userTable') userTable: any;



  async loadUsers() {
    this.auth.getAll().subscribe((res: any) => {
      this.userlist = res
      this.service.getAllRoles().subscribe((data: any) => {
        this.userlist.forEach((item:any) => {
          data.forEach((role:any) => {
            (item.roleId == role.id) && (item.role = role.nombre)
          })
        })
      })
      this.dataSource = new MatTableDataSource(this.userlist);
    })
  }

  openDialog(id:any){
    const item = this.userlist.find((x:any) => x.id === id)

    const dialogRef = this.dialog.open(UpdateuserComponent, {
      data: item
    });
  }

  removeUser(id: any){
    this.auth.removeUser(id).subscribe(res => {
      this.loadUsers()
      this.toastr.success('User removed')
    })
  }


}
