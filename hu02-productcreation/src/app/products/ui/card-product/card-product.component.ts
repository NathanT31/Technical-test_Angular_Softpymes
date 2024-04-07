import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/products.interface';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-card-product',
  template: `
    <div class="border border-gray-500/50 rounded-md p-4 flex flex-row gap-x-4">
      <div class="flex-1">
        <h4 class="text-white mb-2 font-bold">{{ product.name }}</h4>
        <small class="text-yellow-500 mb-2">{{ product.brand }}</small>
        <p class="text-gray-300 mb-2">
          {{ product.weight ? product.weight : '0' }} kg
        </p>
        <p class="text-gray-300 mb-2">$ {{ product.price }}</p>
        <p class="text-gray-400 text-sm">
          {{
            !product.description ? 'No description here.' : product.description
          }}
        </p>
      </div>
      <div>
        <app-menu
          (onEditProduct)="onEditProduct(product)"
          (onDeleteProduct)="onDeleteProduct(product)"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [MenuComponent],
})
export class CardProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() editProduct = new EventEmitter<Product>();

  @Output() deleteProduct = new EventEmitter<string>();

  onEditProduct(product: Product) {
    this.editProduct.emit(product);
  }

  onDeleteProduct(product: Product) {
    this.deleteProduct.emit(product.id);
  }
}
