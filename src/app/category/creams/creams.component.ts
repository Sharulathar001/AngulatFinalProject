import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-creams',
  templateUrl: './creams.component.html',
  styleUrls: ['./creams.component.css']
})

export class CreamsComponent {

  constructor(private router: Router , private cartService: CartService ,  private displaycartservice:DisplaycartService , private authService : AuthService) {}

  products=[
    {id:1,
    image:'https://i.pinimg.com/564x/d8/62/8b/d8628bc635c29e8866446d39ea354b6c.jpg    ',
    name:"Hydration Face Cream",
    price:299,
    description:"Cannabis Sativa Happy Hydration Face Cream. Make your skin extra happy and hydrated with this creamy, hemp-derived Cannabis sativa face cream. Nourish and condition your face with our latest line today."},

    {id:2,
    image:'https://i.pinimg.com/564x/a1/cc/22/a1cc22533234ee4626bf4b3da1a15fe5.jpg    ',
    name:"Face Cream",
    price:249,
    description:"Bobbi Brown Hydrating Face Cream 50 ml"},

    {id:3,
    image:'https://i.pinimg.com/564x/48/a2/83/48a283b707b70f80c2081fc0d135f1d5.jpg',
    name:"Skincare cream",
    price:400,
    description:"These Are The Best Drugstore Skincare Products For Super Dry Skin"},

    {id:4,
    image:'https://i.pinimg.com/564x/49/b6/15/49b6158454e2e060751dd2efc8a63631.jpg    ',
    name:"Face Moisturizers",
    price:399,
    description:"The 10 Best Face Moisturizers To Add to Your Routine In 2023. These are worth your time and money."},

    {id:5,
    image:'https://i.pinimg.com/564x/d7/2a/18/d72a18e7fc4c388a2f842db95e43c11e.jpg    ',
    name:"bright cream",
    price:290,
    description:"Get that glowy, bright, model-lookin’ skin.    "},

    {id:6,
    image:'https://i.pinimg.com/564x/1a/16/0e/1a160e8caa7faac1aabbaee1d427aa07.jpg    ',
    name:"Face Moisturizer",
    price:280,
    description:"How to Do Kylie Jenner’s Skincare Routine. Kylie Skin Face Moisturizer."},
  ]

  searchText: string = ''; // Initialize the search text


  get filteredProducts(): any[] {
    return this.products.filter(product =>
      this.searchText === '' || product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSearchTextEntered(searchText: string): void {
    this.searchText = searchText;
  }



  buyNow() {
    // Logic for Buy Now...
    this.router.navigate(['/buynow']); // Navigate to the buynow page
  }


  navigateToEnlargedCard(card: any) {
    this.router.navigate(['/show-card', card.id], { state: { card } });
  }
  addToCart(product: any) {
    // Check if the user is authenticated
    if (this.authService.IsAuthenticated()) {
      const existingItem = this.cartService.getCartItems().find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        product.quantity = 1;
        this.cartService.addToCart(product);
      }

      product.addedToCart = true;
    } else {
      const confirmed = window.confirm('Kindly log in to continue.'); // Display confirmation dialog
      if (confirmed) {
        this.router.navigate(['/login']); // Navigate back if confirmed
      }
    }
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
