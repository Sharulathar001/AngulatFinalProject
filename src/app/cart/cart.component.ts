import { Component, Injectable, OnInit } from "@angular/core";
import { CartService } from "../cartservice";
import { LoginAuthService } from "../loginAuthservice";

@Injectable()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private  loginAuthService :LoginAuthService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartAndTotal();
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCartAndTotal();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.updateCartAndTotal();
  }

  updateCartAndTotal() {
    this.cartService.updateTotalQuantity();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartService.calculateTotal();
  }
  get totalItemsQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
