import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  // id!: number;
  selectedColor?: string;
  selectedProductPrice: any;
  producto: any[] = [];
  colors: any[] = [];
  constructor(private service: ConsultasService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private auth: AuthService) { 
    
  }

  updatePrice() {
    this.producto.forEach(element => {
      if(element.colorId == this.selectedColor){
        this.selectedProductPrice = element.precio
      }
    });
    console.log(this.selectedColor)
    console.log(this.selectedProductPrice)

  }

  isSeller(){
    return this.auth.isSeller()
  }

  getColors() {
    this.service.getAllColors().subscribe((res: any) => {
      let ids: any[] = []
      this.producto.forEach((element: any) => {
        ids.push(element.colorId)
      });
      res = res.filter((item: any) => ids.includes(item.id))
      this.colors = res
      this.selectedColor = this.colors[0].id
      this.selectedProductPrice = this.producto[0].precio
    })
  }

  ngOnInit(): void {
    this.service.getProductDetailByProductId(this.data.id).subscribe(data => this.producto = data)
    this.getColors()
  }
}
