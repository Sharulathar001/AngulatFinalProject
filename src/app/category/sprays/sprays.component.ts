import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-sprays',
  templateUrl: './sprays.component.html',
  styleUrls: ['./sprays.component.css']
})
export class SpraysComponent {


  constructor(private router: Router , private cartService: CartService, private displaycartservice:DisplaycartService, private authService : AuthService) {}
  products=[

    {id:1,
      image:'https://i.pinimg.com/564x/c8/d6/99/c8d6996b18eff5900edf2c2b31db5145.jpg      ',
      name:"FIXING SPRAY",
      price:399,
      description:"keep it PERFECT! make-up FIXING SPRAY. Stay gorgeous!"},

      {id:2,
        image:'https://i.pinimg.com/564x/81/76/94/817694fa33e25bf6683e9c040bcdc633.jpg        ',
        name:"Glow Fixing Spray",
        price:299,
        description:"Revolution Fix And Glow Fixing Spray 100 Ml. About this item Makeup setting spray that adds a healthy glow to your face."},

        {id:3,
          image:'https://i.pinimg.com/564x/e0/be/d3/e0bed315217daa57d80fa2989784c433.jpg          ',
          name:"Hydrating Spray",
          price:499,
          description:"MAC Cosmetics MAC Magic Radiance Fix+ All-Day Hydrating Spray | Nordstrom          "},


          {id:4,
            image:'https://i.pinimg.com/564x/63/0e/b0/630eb00016a3a55673a579c0885b9ac6.jpg      ',
            name:"Art Fix Design Spray",
            price:410,
            description:"Loreal Professionnel Tecni Art Fix Design Spray 200ml. A strong hold styling spray to make your style last the night Loreal Professionnel Tecni Art Fix Design Spray has an ultra strong."},

            {id:5,
              image:'https://i.pinimg.com/564x/d7/6a/55/d76a55084fa91404933d65e844bbea02.jpg        ',
              name:"fixing spray",
              price:399,
              description:"Professional Make-up fixing spray"},

              {id:6,
                image:'https://i.pinimg.com/564x/ea/b4/36/eab436a08256f7b1d9da654808cadb8f.jpg          ',
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
