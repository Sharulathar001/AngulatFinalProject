import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-eyebrows',
  templateUrl: './eyebrows.component.html',
  styleUrls: ['./eyebrows.component.css']
})
export class EyebrowsComponent {


  constructor(private router: Router , private cartService: CartService ,  private displaycartservice:DisplaycartService , private authService : AuthService) {}
  products=[
    {id:1,
    image:'https://i.pinimg.com/564x/6a/e9/01/6ae901b4930f47b556579cb88b3a9c1c.jpg    ',
    name:"Beginners brows",
    price:149    ,
    description:"These makeup tips for beginners will have you leveling up your game in no time.    "},

    {id:2,
      image:'https://i.pinimg.com/564x/e0/0b/63/e00b63d1e5cddc09a4652b5a24b9f391.jpg      ',
      name:"Brows look great",
      price:199,
      description:"We all want to make sure are brows look great, and that means investing in beauty products to help."},

      {id:3,
      image:'https://i.pinimg.com/564x/9e/2e/25/9e2e2554b09087ecac15ecd6b17b3a1d.jpg      ',
      name:"fabulous brows",
      price:219,
      description:"Get ready to save some $$$ and look fabulous while you do it."},

      {id:4,
        image:'https://i.pinimg.com/564x/6f/40/ac/6f40ac17a20bcbf07797acfd30ec8993.jpg        ',
        name:"Eyebrow",
        price:200,
        description:"Maybelline's New Microblading Eyebrow Product.        "},

        {id:5,
          image:'https://i.pinimg.com/564x/c2/4a/ce/c24acea2c7120de29f29213c1fa487ce.jpg          ',
          name:" eyebrow high quality",
          price:249,
          description:"TatBrow is your destination for all things eyebrow. Our high quality and cruelty-free beauty products make getting the perfect brows easy every single time.          "},
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
