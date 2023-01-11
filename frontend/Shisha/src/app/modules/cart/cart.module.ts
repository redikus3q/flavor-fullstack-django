import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlavorsModule } from '../flavors/flavors.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    FlavorsModule,
    MatIconModule,
  ]
})
export class CartModule { }
