import { Component, Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
  styleUrls: ['./lips.component.css']
})
export class LipsComponent {


  constructor(private router: Router , private cartService: CartService , private displaycartservice:DisplaycartService , private authService : AuthService) {}
  products=[

    {id:1,
      image:'https://i.pinimg.com/564x/ff/47/33/ff4733ca98e796fbeb500b4ee535706f.jpg      ',
      name:"Lip Balm Peach Fragrance",
      price:149,
      description:"Delicious Drop Lip Balm Peach Fragrance contains shea butter and olive oil, has the outstanding moisturizing ability, anti-cracking, and pink lips.       "},

      {id:2,
        image:'https://i.pinimg.com/564x/77/51/10/775110104606fb1bcfca380016298031.jpg        ',
        name:"Strawberry Match Lip Balm ",
        price:249,
        description:"Shop the Winky Lux Strawberry Matcha Lip Balm at Anthropologie today.        "},

        {id:3,
          image:'https://i.pinimg.com/564x/b1/af/37/b1af375b9c01f865914aa8d192fc245a.jpg          ',
          name:"eos lip balm",
          price:180,
          description:"eos lip balm - Strawberry sorbet          "},

          {id:4,
            image:'https://i.pinimg.com/564x/ce/77/73/ce7773e653641d7df9959cc8e5d4ccb9.jpg            ',
            name:"Tinted lip balm",
            price:260,
            description:"A lightweight, tinted lip balm for glossy, hydrated, & extra kissable lips throughout the day!            "},

            {id:5,
              image:'https://i.pinimg.com/564x/62/97/3f/62973f63ed29d73f76bc95106beef6c7.jpg              ',
              name:"Lip moisturizer",
              price:200,
              description:"A more moisturized mouth is just a swipe away.              "},

              {id:6,
                image:'https://i.pinimg.com/564x/cf/de/c8/cfdec8328fb9bf7203dde77a89e9705c.jpg      ',
                name:"Lipstick",
                price:359,
                description:"My New All-Time Favorite Lipstick. It Feels Amazing      "},

                {id:7,
                  image:'https://i.pinimg.com/564x/fc/95/a8/fc95a8fde6efd87c6377786a9ab11058.jpg        ',
                  name:"Beauty today lips",
                  price:290,
                  description:"Define your Attitude of Beauty today.         "},

                  {id:8,
                    image:'https://i.pinimg.com/564x/82/09/58/820958a4b505399716a668bb00c7d012.jpg          ',
                    name:"Audacious Lipstic",
                    price:200,
                    description:"A special edition NARS Audacious Lipstic.          "},

                    {id:9,
                      image:'https://i.pinimg.com/564x/5f/d3/0d/5fd30d97efe920ed8d5c2fb0c7595ac9.jpg',
                      name:"Nude-Pink Lipstick",
                      price:349,
                      description:"The Prettiest Nude-Pink Lipstick for Every Skin Tone            "},

                      {id:10,
                        image:'https://i.pinimg.com/564x/28/60/07/286007f9f181ef42a310fb5ef7d9e36e.jpg              ',
                        name:"Bullet Matte Lipsticks",
                        price:299,
                        description:"The Prettiest Nude-Pink Lipstick for Every Skin Tone              "},

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
