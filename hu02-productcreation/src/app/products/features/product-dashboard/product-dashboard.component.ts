import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { CardProductComponent } from '../../ui/card-product/card-product.component';
import { ProductsService } from '../../data-access/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-dashboard',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[1200px] m-auto">
      <section class="grid grid-cols-3 gap-8 mt-8">
        @for (product of products$ | async; track product.id) {
        <app-card-product
          [product]="product"
          (deleteProduct)="deleteProduct($event)"
          (editProduct)="editProduct($event)"
        />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CardProductComponent, AsyncPipe],
})
export default class ProductDashboardComponent {
  private _productsService = inject(ProductsService);

  private _router = inject(Router);

  products$ = this._productsService.getProducts();

  async deleteProduct(id: string) {
    try {
      await this._productsService.deleteProduct(id);
    } catch (error) {}
  }

  editProduct(product: Product) {
    this._router.navigate(['/dashboard/edit', product.id]);
  }

  async changeQuery(query: string) {
    try {
      const products = await this._productsService.searchProductByQuery(query);
      this.products$ = of(products);
    } catch (error) {}
  }
}
