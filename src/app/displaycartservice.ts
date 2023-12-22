// cart.service.ts
import { CartService } from './cartservice';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplaycartService {
  router: any;
  cartService: any;
  addToCart(product: any) {
    const existingItem = this.cartService.getCartItems().find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.quantity = 1;
      this.cartService.addToCart(product);
    }

    product.addedToCart = true; // Set addedToCart flag for the clicked product
  }


  buyNow() {
    // Logic for Buy Now...
    this.router.navigate(['/buynow']); // Navigate to the buynow page
  }


  
  getAddedToCart(): boolean {
    return this.cartService.getAddedToCart();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
