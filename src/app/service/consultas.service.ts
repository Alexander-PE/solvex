import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('https://localhost:7134/api/productos')
  }

  getProductById(id: any) {
    return this.http.get(`https://localhost:7134/api/productos/${id}`)
  }

  getAllColors() {
    return this.http.get('https://localhost:7134/api/colores')
  }

  getAllRoles() {
    return this.http.get('https://localhost:7134/api/roles')
  }

  getColorById() {
    return this.http.get('https://localhost:7134/api/colores')
  }

  subirFotoUrl(data: FormData) {
    return this.http.post("https://api.cloudinary.com/v1_1/dv5ynbm0e/image/upload", data)
  }

  addProduct(data: any) {
    return this.http.post('https://localhost:7134/api/productos', data)
  }

  addProductDetail(data: any) {
    return this.http.post('https://localhost:7134/api/detalle', data)
  }

  getProductDetailById(id: any) {
    return this.http.get(`https://localhost:7134/api/detalle/${id}`).pipe(map((res: any) => {
      return res
    }))
  }
}
