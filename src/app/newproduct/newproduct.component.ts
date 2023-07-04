import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../service/consultas.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  constructor(public fb: FormBuilder, private toastr: ToastrService, private router: Router, private service: ConsultasService) { }

  selectedColor?: string;
  data = new FormData()
  colors: any = [];
  url: any = '';

  productForm = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    imagenUrl: '',
    usuarioId: Number(sessionStorage.getItem('userId')),
    precio: this.fb.control('', Validators.required),
    descripcion: this.fb.control('', Validators.required),
    colorId: '',
  })

  cambiarFoto(event: any) {
    this.data.set('file', event.target.files[0])
    this.data.set('upload_preset', "bht4wanu")
    return this.service.subirFotoUrl(this.data).subscribe((res: any) => {
      this.url = res.url
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productForm.value.imagenUrl = this.url
      this.productForm.value.colorId = this.selectedColor
      this.service.addProduct(this.productForm.value).subscribe((res: any) => {
        this.service.addProductDetail({
          productoId: res.id,
          colorId: this.productForm.value.colorId,
          precio: this.productForm.value.precio,
        }).subscribe((res: any) => {
          this.toastr.success('Product added successfully')
          this.router.navigate([''])
        })
      })
      // console.log(this.productForm.value)
    } else {
      this.toastr.warning('Invalid form')
    }
  }


  getColors() {
    this.service.getAllColors().subscribe((res: any) => {
      this.colors = res
      // console.log(this.colors)
    })
  }

  ngOnInit(): void {
    this.getColors()
  }

}
