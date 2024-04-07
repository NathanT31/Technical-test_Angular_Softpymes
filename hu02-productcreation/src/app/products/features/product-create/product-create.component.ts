import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { IconRocket } from '../../../shared/ui/icons/rocket';
import { IconBack } from '../../../shared/ui/icons/back';
import { ProductsService } from '../../data-access/products.service';
import { ProductForm } from '../../shared/interfaces/products.interface';

export interface CreateForm {
  name: FormControl<string>;
  brand: FormControl<string>;
  weight: FormControl<string>;
  price: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-product-create',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createProduct()">
        <div class="mb-8">
          <label for="name" class="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Product name"
            formControlName="name"
          />
        </div>
        <div class="mb-8">
          <label for="brand" class="block mb-2 text-sm font-medium"
            >Brand</label
          >
          <input
            type="text"
            id="brand"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Product brand"
            formControlName="brand"
          />
        </div>
        <div class="mb-8">
          <label for="weight" class="block mb-2 text-sm font-medium"
            >Weight (kg)</label
          >
          <input
            type="text"
            id="weight"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="2.5"
            formControlName="weight"
          />
        </div>
        <div class="mb-8">
          <label for="price" class="block mb-2 text-sm font-medium"
            >Price</label
          >
          <input
            type="text"
            id="price"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="0.99"
            formControlName="price"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Description (optional)</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Your description goes here"
            formControlName="description"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/dashboard"
          >
            <app-icon-back />
            Back to dashboard
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
            @if (productId) { Edit your product } @else { Create your product }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, IconRocket, IconBack, RouterLink],
})
export default class ProductCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _productsService = inject(ProductsService);

  private _productId = '';

  get productId(): string {
    return this._productId;
  }

  @Input() set productId(value: string) {
    this._productId = value;
    this.setFormValues(this._productId);
  }

  form = this._formBuilder.group<CreateForm>({
    name: this._formBuilder.control('', Validators.required),
    brand: this._formBuilder.control('', Validators.required),
    weight: this._formBuilder.control(''),
    price: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

  async createProduct() {
    if (this.form.invalid) return;

    try {
      const product = this.form.value as ProductForm;
      !this.productId
        ? await this._productsService.createProduct(product)
        : await this._productsService.updateProduct(this.productId, product);
      this._router.navigate(['/dashboard']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const product = await this._productsService.getProduct(id);
      if (!product) return;
      this.form.setValue({
        name: product.name,
        brand: product.brand,
        weight: product.weight,
        price: product.price,
        description: product.description,
      });
    } catch (error) {}
  }
}
