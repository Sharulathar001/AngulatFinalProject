import { Component, OnInit } from '@angular/core';
import { CartService } from '../cartservice';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../loginAuthservice';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css'],
  providers: [DatePipe],
})
export class BuynowComponent implements OnInit{

  address: string;
  upiId: string;
  verificationResult: string;
  showUPIInput: boolean = false;
  paymentMethod: string;
  netBankingOption: string;
  card: any;


  constructor(private route: ActivatedRoute,private loginAuthService:LoginAuthService , private authService : AuthService, private router: Router , private location: Location , private cartService: CartService, private datePipe: DatePipe)  {}

  product: any;
  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    console.log(this.product);
    this.card = history.state.card;
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  goBack(): void {
    this.location.back();
  }

  toggleUPIInput() {
    this.showUPIInput = !this.showUPIInput;
  }

  verifyUPI() {
    if (this.isUPIFormatValid(this.upiId)) {
      this.verificationResult = 'UPI ID is valid.';
    } else {
      this.verificationResult = 'Invalid UPI ID.';
    }
  }

  isUPIFormatValid(upiId: string): boolean {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return regex.test(upiId);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.router.navigate(['/checkout']); // Redirect to the checkout component
    } else {
      alert(' Please check the required fields.');
    }
}



cartItems: any[] = [];
  total: number = 0;

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

  paymentSuccessful: boolean = false;
handlePaymentSuccess() {
  this.paymentSuccessful = true;
}

calculateDeliveryDate() {
  const currentDate = new Date();
  const expectedDeliveryDate = new Date();
  expectedDeliveryDate.setDate(currentDate.getDate() + 5);
  return this.datePipe.transform(expectedDeliveryDate, 'yyyy-MM-dd');
}
}
