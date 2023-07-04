import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  id:number
  nombre: string;
  imagenUrl: string;
  usuarioId: number;
  usuario: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  id!: number;
  producto: any;
  colors: any;
  color: any;
  constructor(private activatedRoute: ActivatedRoute, private service: ConsultasService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe((params) => {
  //     this.id = params['id'];
      
  //     this.producto = this.service.getProductById(this.id)
  //     console.log(this.producto)
  //   })
  // }

  ngOnInit(): void {
    this.service.getProductDetailById(this.data.id).subscribe(data => this.producto = data)
    // this.service.getAllColors().subscribe((res: any) => {
    //   this.colors = res 
    // })

    // this.color = this.colors.filter((x:any) => x.id === this.producto.colorId)
    setTimeout(() => {
      console.log(this.producto)
    }, 5000);
  }



}
