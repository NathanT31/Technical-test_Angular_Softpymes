import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product, ProductForm } from '../shared/interfaces/products.interface';

const PATH = 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  getProducts() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  async getProduct(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Product;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchProductByQuery(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products = [...products, { id: doc.id, ...doc.data() } as Product];
    });
    return products;
  }

  createProduct(product: ProductForm) {
    return addDoc(this._collection, product);
  }

  updateProduct(id: string, product: ProductForm) {
    return updateDoc(this.document(id), { ...product });
  }

  deleteProduct(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
