import { Component, ViewChild } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent {
  
  constructor(private service: ConsultasService, private toastr: ToastrService, private auth: AuthService) { }
  products: any[] = [];
  userProducts: any[] = [];
  lastInfo: any[] = [];
  dataSource: any;
  colors: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'color', 'precio', 'action'];
  @ViewChild('userTable') userTable: any;

  getAll() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res.filter((item: any) => item.usuarioId == this.auth.getUserId())
    })
  }

  getUserProducts() {
    this.getAll()
    this.getColors()
    this.service.getProductDetailByUserId(this.auth.getUserId()).subscribe(data => {
      this.userProducts = data;
      this.userProducts.forEach((item: any) => {
        if(item.productoId == this.products.find((x: any) => x.id == item.productoId).id){
          item.nombre = this.products.find((x: any) => x.id == item.productoId).nombre
          item.color = this.colors.find((x: any) => x.id == item.colorId).nombre
        }
      })
      this.dataSource = this.userProducts;
    })
  }

  getColors() {
    this.service.getAllColors().subscribe((res: any) => {
      this.colors = res
    })
  }

  removeProductDetail(id: any){
    this.service.removeProductDetail(id).subscribe(res => {
      this.getUserProducts()
      this.toastr.success('Product removed')
    })
  }
  
  ngOnInit(): void {
    this.getUserProducts()
  }
}
