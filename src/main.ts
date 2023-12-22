// Import required modules and functions
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Import your app module
import { environment } from 'src/app/environments/environment';
import { initializeApp } from 'firebase/app'; // Import initializeApp function

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

if (environment.production) {
  enableProdMode();
}

// Start the Angular application
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
