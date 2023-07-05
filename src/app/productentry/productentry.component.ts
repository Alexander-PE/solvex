import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../service/consultas.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productentry',
  templateUrl: './productentry.component.html',
  styleUrls: ['./productentry.component.css']
})
export class ProductentryComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private service: ConsultasService, private auth: AuthService) { }

  productId: any;
  selectedColor?: string;
  colors: any = [];
  producto: any = [];

  productDetailForm = this.fb.group({
    productoId: '',
    colorId: '',
    precio: this.fb.control('', Validators.required),
    usuarioId: this.auth.getUserId(),
  })

  addProductDetail() {
    if(this.selectedColor == undefined) {
      this.toastr.error('Select a color or go to Home Page')
      return
    }
    if(this.productDetailForm.valid) {
      this.productDetailForm.value.productoId = this.productId
      this.productDetailForm.value.colorId = this.selectedColor
      this.service.addProductDetail(this.productDetailForm.value).subscribe((res: any) => {
        this.toastr.success('Product added successfully')
        this.router.navigate([''])
      })
    }
  }

  getColors() {
    this.service.getAllColors().subscribe((res: any) => {
      let ids: any[] = []
      this.producto.forEach((element: any) => {
        ids.push(element.colorId)
      });
      res = res.filter((item: any) => !ids.includes(item.id))
      this.colors = res
    })
  }
  
  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.productId = params['id'];
    });
    this.service.getProductDetailByProductId(this.productId).subscribe(data => this.producto = data)
    this.getColors()
  }

}
