import { Component } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent {
  constructor(private service: ConsultasService, private router: Router, private auth: AuthService) { }
  products: any[] = [];

  getAll() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res
    })
  }

  getUserProducts() {
    this.getAll()
    this.products = this.products.filter((item: any) => item.usuarioId == this.auth.getUserId())

  }

  ngOnInit(): void {
    this.getUserProducts()
  }
}
