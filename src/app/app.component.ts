import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './authservice';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CartService } from './cartservice';
import { LoginAuthService } from './loginAuthservice';


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FairGlow';

constructor(private activatedRoute: ActivatedRoute, private authService: AuthService , private cartService:CartService, private router: Router, private  loginAuthService :LoginAuthService){

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

onCategoryChange(event: any) {
  const selectedCategory = event.target.value;
  if (selectedCategory) {
    this.router.navigate(['/' + selectedCategory]);
  }
}

menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


}
