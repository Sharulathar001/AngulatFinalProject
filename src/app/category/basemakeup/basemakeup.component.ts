import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice';
import { CartService } from 'src/app/cartservice';
import { DisplaycartService } from 'src/app/displaycartservice';

@Injectable()
@Component({
  selector: 'app-basemakeup',
  templateUrl: './basemakeup.component.html',
  styleUrls: ['./basemakeup.component.css']
})
export class BasemakeupComponent {

  constructor(private router: Router , private cartService: CartService ,  private displaycartservice:DisplaycartService, private authService : AuthService) {}

  products=[
    {id:1,
    image:'https://i.pinimg.com/564x/46/ee/c6/46eec6914ca4f536f39ca4488f780dcc.jpg',
    name:"Base Primer",
    price:349,
    description:"Makeup Base PrimerColor: TransparentNet Weight."},

    {id:2,
    image:'https://i.pinimg.com/736x/44/84/bd/4484bda20aa6ceeeb232a65fce6b0cbe.jpg',
    name:"CONTOUR PALETTE",
    price:299,
    description:"Buy ❤️ CONTOUR PALETTE by Flormar. ⭐ Facial contouring palette."},

    {id:3,
    image:'https://i.pinimg.com/564x/c4/9f/01/c49f01116af49955fce71195b74d479d.jpg',
    name:"PRO Contour Palette",
    price:319,
    description:"LORAC PRO Contour Palette with Contour Brush! "},

    {id:4,
    image:'https://i.pinimg.com/564x/c6/4c/b6/c64cb632db7f82cb6d21e423b5fd7455.jpg    ',
    name:"Vitamin C serum ",
    price:200,
    description:"Vitamin C serum helps support skin health by boosting collagen production and the natural acids in Vitamin C can help tighten skin and make it smoother."},

    {id:5,
    image:'https://i.pinimg.com/564x/57/ed/c8/57edc851efdf110fd1095a3fb6a8ac60.jpg    ',
    name:"face serum",
    price:250,
    description:"Meet the single most important product in your skincare regime: the best "},

    {id:6,
    image:'https://i.pinimg.com/564x/a9/22/dc/a922dcdf204f784a6a348a6a3f1b0cee.jpg    ',
    name:"Foundation",
    price:399,
    description:"Maybelline Fit Me Matte + Poreless Foundation    "},

    {id:7,
    image:'https://i.pinimg.com/564x/7d/d2/98/7dd29894f2b98243988996f03b0002c7.jpg',
    name:"foundation",
    price:380,
    description:"Shop clean makeup from ILIA Beauty—featuring mascara, foundation, and more. Try ILIA’s clean beauty to make your skin look and feel alive."},

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

