import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent {

  constructor(private router: Router , private cartService: CartService, private displaycartservice:DisplaycartService, private authService : AuthService) {}
  products=[

    {id:1,
      image:'/assets/01.avif',
      name:"FIXING SPRAY",
      price:399,
      description:"keep it PERFECT! make-up FIXING SPRAY. Stay gorgeous!"},

      {id:2,
        image:'/assets/p2.avif',
        name:"Glow Fixing Spray",
        price:299,
        description:"Revolution Fix And Glow Fixing Spray 100 Ml. About this item Makeup setting spray that adds a healthy glow to your face."},

        {id:3,
          image:'/assets/p3.avif',
          name:"Hydrating Spray",
          price:499,
          description:"MAC Cosmetics MAC Magic Radiance Fix+ All-Day Hydrating Spray | Nordstrom          "},


          {id:4,
            image:'/assets/p4.avif',
            name:"Art Fix Design Spray",
            price:410,
            description:"Loreal Professionnel Tecni Art Fix Design Spray 200ml. A strong hold styling spray to make your style last the night Loreal Professionnel Tecni Art Fix Design Spray has an ultra strong."},

            {id:5,
              image:'/assets/p5.avif',
              name:"fixing spray",
              price:399,
              description:"Professional Make-up fixing spray"},

              {id:6,
                image:'/assets/p6.avif',
                name:" Humidity Resistant Hairspray",
                price:389,
                description:"Biolage Freeze Fix Humidity Resistant Hairspray. Biolage Styling Freeze Fix Spray is the ultimate humidity-resistant, water-free fast-dry spray that lifts and locks styles into place with all-day firm control and aerial support."},

                {id:6,
                  image:'/assets/p7.avif',
                  name:" Humidity Resistant Hairspray",
                  price:389,
                  description:"Biolage Freeze Fix Humidity Resistant Hairspray. Biolage Styling Freeze Fix Spray is the ultimate humidity-resistant, water-free fast-dry spray that lifts and locks styles into place with all-day firm control and aerial support."},
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
