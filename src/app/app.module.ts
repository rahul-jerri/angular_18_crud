import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Required for *ngIf and *ngFor
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule for reactive forms
import { AppComponent } from './app.component';  // Import your AppComponent

@NgModule({
  imports: [
    CommonModule,   // Common module for Angular built-in directives like *ngIf, *ngFor
    ReactiveFormsModule,  // Make sure this is included
  ],
  providers: [],
})
export class AppModule { }
