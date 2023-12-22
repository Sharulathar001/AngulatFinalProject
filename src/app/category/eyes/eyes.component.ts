import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.css']
})
export class EyesComponent {


  constructor(private router: Router , private cartService: CartService ,  private displaycartservice: DisplaycartService , private authService : AuthService) {}
  products=[
    {id:1,
      image:'https://i.pinimg.com/564x/e0/96/f8/e096f850a153adeb0f158d958e5b66a3.jpg    ',
      name:"False Eyelashes",
      price:250,
      description:"Natural False Eyelashes 3pairs    "},

      {id:2,
        image:'https://i.pinimg.com/564x/1a/ab/d6/1aabd625084e89a2f811c2295fb42fbc.jpg      ',
        name:"Double Layer Silk Lashes",
        price:200,
        description:"Double Layer Silk Lashes that fit any occasion.       "},

        {id:3,
          image:'https://i.pinimg.com/564x/49/46/2b/49462b4c3e0e79a9487f45164bc56217.jpg        ',
          name:"rubber curling pad",
          price:100,
          description:"opening and closing and a contoured rubber curling pad to create beautifully curled lashes. Comes with replacement pad.        "},

          {id:4,
            image:'https://i.pinimg.com/564x/17/18/cd/1718cd49b930c07842ee1e48bf064228.jpg          ',
            name:"Cheap False Eyelashes",
            price:170,
            description:"Cheap False Eyelashes, Buy Quality Beauty & Health Directly from China Suppliers          "},

            {id:5,
              image:'https://i.pinimg.com/564x/9b/1c/4d/9b1c4de20492c5eb5de63db7ca45af9b.jpg            ',
              name:"False Eyelashes",
              price:200,
              description:"Natural Long Cosplay Makeup Cross Strip False Eyelashes Black Eye Lashes 1pair.            "},

              {id:6,
                image:'https://i.pinimg.com/564x/e0/b0/8a/e0b08a3cf28483cb92e82cb5b6b2d9ab.jpg      ',
                name:"Liquid Eyeliner",
                price:150,
                description:"14 Liquid Eyeliners That Will Give You the Sharpest Cat-Eye Ever. Your perfect winged eye is one liner away!      "},

                {id:7,
                  image:'https://i.pinimg.com/564x/8a/b2/cd/8ab2cd24c5eab10125267d048aa47246.jpg        ',
                  name:"Gel Eyeliner",
                  price:200,
                  description:"The Highest Ranked Gel Eyeliner Right Now. Why everyone is bananas over this top-rated gel eyeliner        "},

                  {id:8,
                    image:'https://i.pinimg.com/564x/df/a2/db/dfa2dbd9c79e07ba0e802cd02a4bd361.jpg          ',
                    name:"prestige mascara",
                    price:350,
                    description:"POPSUGAR Editors Really Think of Too Faced's New Better Than Liner. After the massive success of the Too Faced Better Than Mascara ($24) — which sells once every 7.5 seconds and is the No. 1 selling prestige mascara          "},

                    {id:9,
                      image:'https://i.pinimg.com/564x/e9/1c/1f/e91c1f3059135e91333a48d2271e8ee8.jpg            ',
                      name:"Liners",
                      price:300,
                      description:"Which Products Are ACTUALLY Worth The Money? Editors tell you what they always splurge and save on."},

                      {id:10,
                        image:'https://i.pinimg.com/564x/58/bf/43/58bf43b2ea666c6fcb00fb71500854cd.jpg              ',
                        name:"Eyeliner pencil",
                        price:199,
                        description:"We have rounded up the best eyeliner pencils that are long-lasting, pigmented and easy to use, not to mention life-proof, from budget to luxury picks. "},

                        {id:11,
                          image:'https://i.pinimg.com/564x/96/c8/f4/96c8f4418923ac19417b3fb21d3cc0bc.jpg      ',
                          name:"Best-selling mascara",
                          price:159,
                          description:"Extensions without the extensions. Our best-selling mascara visibly lengthens and lifts lashes for a baby extensions effect.      "},

                          {id:12,
                            image:'https://i.pinimg.com/564x/c0/87/29/c0872950c06c6118e235183a3df82e83.jpg        ',
                            name:"Mascara",
                            price:299,
                            description:"Even against luxury price tags, drugstore go-to Maybelline is the Number 1 selling mascara brand in the U.S. Here's why.        "},

                            {id:13,
                              image:'https://i.pinimg.com/564x/44/18/8f/44188fa5413a77598fb188181d6583a1.jpg          ',
                              name:"Light Maskara",
                              price:150,
                              description:"Get length, volume, and curl without the icky ingredients.          "},

                              {id:14,
                                image:'https://i.pinimg.com/564x/bb/14/a8/bb14a8e14fd05d0b57ae4441f964d80e.jpg            ',
                                name:"Liquid Maskara",
                                price:129,
                                description:"Length, separation, volume, and curl — it doesn’t get any better.            "},

                                {id:15,
                                  image:'https://i.pinimg.com/564x/e9/ee/00/e9ee00f2c528043c85f526889265c2db.jpg              ',
                                  name:"mascara for sensitive eyes",
                                  price:159,
                                  description:" Ophthalmologist-tested and allergy-tested. Suitable mascara for sensitive eyes and contact lens wearers.              "},
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
