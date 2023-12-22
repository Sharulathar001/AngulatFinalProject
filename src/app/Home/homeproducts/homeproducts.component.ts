import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-homeproducts',
  templateUrl: './homeproducts.component.html',
  styleUrls: ['./homeproducts.component.css']
})
export class HomeproductsComponent implements OnInit{

  product: any;
  ngOnInit(): void {
  }
  constructor(private router: Router , private cartService: CartService , private displaycartservice: DisplaycartService , private authService : AuthService, private route: ActivatedRoute) {}


  // searchText:string='';
  // onSearchTextEntered(searchValue:string){
  //   this.searchText=searchValue;
  // }
  products=[
    {id:1,
    image:'/assets/image1.jpeg',
    name:"Pastel Obsessions Palette",
    price:250,
    offer:199,
    description:"Long lasts and suits for all skin type and provides matte finish gives presentable look "},

    {id:2,
    image:'/assets/image2.jpeg',
    name:"Cream eyeshadows",
    price:200,
    offer:159,
    description:"Made of natural products and nonside effects"},

    {id:3,
    image:'/assets/image3.jpeg',
    name:"Makeup Brushes",
    price:300,
    offer:259,
    description:"Blends with care gives full coverage with perfect blending."},

    {id:4,
    image:'/assets/image4.jpeg',
    name:"Fenty Gloss",
    price:150,
    offer:99,
    description:"This is the fenty beauty holo daze lipgloss collection!"},

    {id:5,
    image:'/assets/image5.jpeg',
    name:"Highlighter",
    price:200,
    offer:159,
    description:"Too Faced Blinded By the Light Love Light Prismatic Highlighter is a very light beige with warm undertones and a sparkling."},

    {id:6,
    image:'/assets/image6.jpeg',
    name:"Fashion outfits fall ! ",
    price:100,
    offer:95,
    description:" Fashion nails fashionable nails fashion outfit, use it shine like a star."},

    {id:7,
    image:'/assets/image7.jpeg',
    name:"Water Jelly Hydrating Primer",
    price:300,
    offer:250,
    description:" Water Jelly is an ultra-hydrating primer that smooths and quenches skin with a surge of moisture to create the perfect canvas."},

    {id:8,
      image:'/assets/image8.jpeg',
      name:"Velvet Loose Powder 10G Flesh",
      price:250,
      offer:199,
      description:" NARS Soft Velvet Loose Powder sets foundation and controls oil, while visibly blurring the appearance of fine lines and pores with a soft-focus finish."},


    {id:9,
    image:'/assets/image9.jpeg',
    name:"Foundation",
    price:250,
    offer:199,
    description:" I've discovered an amazing foundation that works better for me than any other one. Found out the best foundation I've ever used here!"}
  ]

  searchText: string = ''; // Initialize the search text


  get filteredProducts(): any[] {
    return this.products.filter(
      product =>
        this.searchText === '' ||
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  onSearchTextEntered(searchText: string): void {
    this.searchText = searchText;
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

  navigateToBuynow(product: any) {
    this.router.navigate(['/buynow'], { state: { product } });
  }

  login(){
    this.authService.login();
}

logout(){
  this.authService.logout();
}
getCartCount(): number {
return this.cartService.getTotalQuantity();
}
}
