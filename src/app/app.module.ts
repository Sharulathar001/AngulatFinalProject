import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from'@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Home/header/header.component';
import { HomeproductsComponent } from './Home/homeproducts/homeproducts.component';
import { SearchComponent } from './Home/search/search.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ContainerComponent } from './container/container.component';
import { RegisterComponent } from './register/register.component';
import { LoginAuthService } from './loginAuthservice';
import { BuynowComponent } from './buynow/buynow.component';
import { AuthService } from './authservice';
import { ShowCardComponent } from './show-card/show-card.component';
import { CartService } from './cartservice';
import { BasemakeupComponent } from './category/basemakeup/basemakeup.component';
import { CreamsComponent } from './category/creams/creams.component';
import { EyebrowsComponent } from './category/eyebrows/eyebrows.component';
import { EyesComponent } from './category/eyes/eyes.component';
import { LipsComponent } from './category/lips/lips.component';
import { SpraysComponent } from './category/sprays/sprays.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/app/environments/environment';
import { ComboComponent } from './category/combo/combo.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserLoginComponent } from './user-login/user-login.component';

const appRoute:Routes=[
  {path:'',component:ContainerComponent},
  // login page to register when new user
  { path: 'login', component: LoginComponent, children: [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent }
  ]},
  // register page to login when the registered
  { path: 'register', component: RegisterComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'contact', component: ContactComponent }
  ]},

  { path: 'base', component: BasemakeupComponent ,  },
  { path: 'homeproducts', component: HomeproductsComponent ,  },
  { path: 'eyes', component: EyesComponent , },
  { path: 'eyebrows', component: EyebrowsComponent,  },
  { path: 'lips', component: LipsComponent , },
  { path: 'creams', component: CreamsComponent, },
  { path: 'sprays', component: SpraysComponent ,},
  { path: '', redirectTo: '/base', pathMatch: 'full' },

  {
    path: 'buynow', component: BuynowComponent,
  data: { product: null },
  },


  //default paths
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent ,  canActivate: [LoginAuthService]},
  {path:'buynow',component:BuynowComponent ,canActivate: [LoginAuthService]},
  {path:'contact',component:ContactComponent},
  {path:'container',component:ContainerComponent},
  {path:'combo',component:ComboComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [LoginAuthService] },
  { path: 'show-card/:id', component: ShowCardComponent },
  {path:'**',component:ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeproductsComponent,
    SearchComponent,
    ErrorComponent,
    LoginComponent,
    CartComponent,
    ContactComponent,
    ContainerComponent,
    RegisterComponent,
    BuynowComponent,
    ShowCardComponent,
    BasemakeupComponent,
    CreamsComponent,
    EyebrowsComponent,
    EyesComponent,
    LipsComponent,
    SpraysComponent,
    FooterComponent,
    AboutComponent,
    ComboComponent,
    CheckoutComponent,
    UserLoginComponent,
    // AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
  ],
  providers: [LoginAuthService,AuthService,CartService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
