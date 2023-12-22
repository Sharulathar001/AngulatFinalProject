import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Details } from '../deatils';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component,  Injectable,  OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../authservice';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  allDetails: Details[] = [];
  flag: boolean = false;
  location: any;



  constructor(private http: HttpClient, private router: Router, private authService : AuthService , private route: ActivatedRoute) {}


  ngOnInit() {
    this.fetchDetails();
  }

  onDetailFetch() {
    this.fetchDetails();
  }



  reactiveLoginForms!: FormGroup<any>;
  private fetchDetails() {
    this.http
      .get<{ [key: string]: Details }>(
        'https://pureglow-fe903-default-rtdb.firebaseio.com/credentials.json'
      )
      .pipe(
        map((res) => {
          const details: Details[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              details.push({ ...res[key], id: key });
            }
          }
          return details;
        })
      )
      .subscribe((details) => {
        this.allDetails = details;
        console.log(this.allDetails);

        this.reactiveLoginForms = new FormGroup({
          name: new FormControl(null, Validators.required),
          pass: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
        });
      });
  }


  onLoginCreate() {
    const credentials = this.reactiveLoginForms.value;

    const matchingDetail = this.allDetails.find(detail => (
      (credentials.name === detail.name || credentials.email === detail.email) &&
      credentials.pass === detail.pass
    ));

    if (matchingDetail) {
      console.log('Logged in successfully');
      this.authService.login();

      // Get the returnUrl from the query parameters or set a default if not present
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/container';

      // Use NavigationExtras to preserve query parameters if any
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        relativeTo: this.route,
      };

      this.router.navigate([returnUrl], navigationExtras); // Redirect to the returnUrl
    }
     else {
      if (
        this.allDetails.some(detail =>
          (credentials.pass === detail.pass && (credentials.name != detail.name || credentials.email != detail.email))
        )
      ) {
        alert("Incorrect Username");
        this.router.navigate(['/login']);
      } else if (
        this.allDetails.some(detail =>
          (credentials.pass != detail.pass && (credentials.name === detail.name || credentials.email === detail.email))
        )
      ) {
        alert("Incorrect Password");
        this.router.navigate(['/login']);
      } else {
        alert("Not a logged-in user");
        this.router.navigate(['/register']);
      }
    }
  }



  }

