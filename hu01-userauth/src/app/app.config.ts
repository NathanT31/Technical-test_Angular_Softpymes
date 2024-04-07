import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId":"hu01-userauth","appId":"1:843976501992:web:db0d5bed4c8f7d9b14f75d","storageBucket":"hu01-userauth.appspot.com","apiKey":"AIzaSyC-yM-2QshQuBjrSl_QyVT3te3vyWjHXm8","authDomain":"hu01-userauth.firebaseapp.com","messagingSenderId":"843976501992"
    }))), 
    importProvidersFrom(provideAuth(() => getAuth()))
  ]
};
