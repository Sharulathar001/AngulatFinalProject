import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reactiveForms: FormGroup;
  formStatus: string;

  ngOnInit() {
    this.reactiveForms = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(6), this.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email,this.customEmailValidator]),
      gender: new FormControl(null, Validators.required),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
    });
  }

  onSubmit() {
    if (this.reactiveForms.valid) {
      this.onLoginCreate(this.reactiveForms.value);
      this.showAlert();
    }
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') !== -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      if (!email) {
        return null;  // Allow empty values (handled by required validator)
      }

      const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      if (!pattern.test(email)) {
        return { invalidEmail: true };
      }

      return null;
    };
  }



  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  onLoginCreate(credentials: { name: string, pass: string, email: string, mobile: number }) {
    console.log(credentials);
    const headers = new HttpHeaders({ 'myHeaders': 'PureGlow' });
    this.http.post('https://pureglow-fe903-default-rtdb.firebaseio.com/credentials.json', credentials, { headers: headers })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  showAlert() {

    const message = 'Registered successfully';
    alert(message);
    this.router.navigate(['/login']);
  }
}
