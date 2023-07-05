import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

interface DialogData {
  id: number
  nombre: string;
  imagenUrl: string;
  descripcion: string;
  usuarioId: number;
  usuario: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  selectedColor?: string;
  selectedProductId: any;
  selectedProductPrice: any;
  producto: any[] = [];
  colors: any[] = [];
  constructor(private service: ConsultasService, public dialogRef: MatDialogRef<ProductComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private auth: AuthService, private router: Router) {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngDoCheck() {
    this.producto.forEach(element => {
      if (element.colorId == this.selectedColor) {
        this.selectedProductPrice = element.precio
        this.selectedProductId = element.productoId
      }
    });
  }

  isSeller() {
    return this.auth.isSeller()
  }

  isOwner() {
    return this.auth.isOwner(this.data.usuarioId)
  }

  getColors() {
    this.service.getAllColors().subscribe((res: any) => {
      let ids: any[] = []
      this.producto.forEach((element: any) => {
        ids.push(element.colorId)
      });
      res = res.filter((item: any) => ids.includes(item.id))
      this.colors = res
      this.selectedColor = this.producto[0].colorId
      this.selectedProductId = this.producto[0].productoId
      this.selectedProductPrice = this.producto[0].precio

      
    })
  }

  ngOnInit(): void {
    this.service.getProductDetailByProductId(this.data.id).subscribe(data => this.producto = data)
    this.getColors()
  }
}
