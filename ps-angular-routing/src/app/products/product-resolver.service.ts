import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/of';
// import 'rxjs/add/operator/map';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

  constructor(private productService: ProductService,
    private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const id = route.params['id'];

    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return Observable.of(null);
    }

    return this.productService.getProduct(Number(id))
      .map(product => {
        if (product) {
          return product;
        }

        console.log(`Product was not found: ${id}`);
        this.router.navigate(['/products']);
        return null;
      })
      .catch(error => {
        console.log(`Retrieval error: ${error}`);
        this.router.navigate(['/products']);
        return Observable.of(null);
      });
  }

}
