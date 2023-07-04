import { Component } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import {MatDialog} from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private service: ConsultasService, public dialog:MatDialog) { }

  products: any = []
  
  getAll(){
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res
    })
  }

  ngOnInit(): void {
    this.getAll()
  }

  openDialog(id:any){
    const item = this.products.find((x:any) => x.id === id)

    const dialogRef = this.dialog.open(ProductComponent, {
      data: item
    });
  }
}
