import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = []; // Array to hold cart items
  totalQuantity: number = 0; // Initialize total quantity

  constructor() {}

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.quantity = 1; // Initialize the quantity
      this.cartItems.push(product);
    }

    this.updateTotalQuantity(); // Update total quantity
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateTotalQuantity(); // Update total quantity
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateTotalQuantity(); // Update total quantity
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalQuantity(); // Update total quantity
    }
  }

  public updateTotalQuantity() {
    this.totalQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity,0 );
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalQuantity() {
    return this.totalQuantity;
  }

  calculateTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
