import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Flavor } from 'src/app/interfaces/flavor';
import { FlavorInCart } from 'src/app/interfaces/flavorInCart';
import { FlavorsService } from 'src/app/services/flavors.service';

@Component({
  selector: 'app-flavor',
  templateUrl: './flavor.component.html',
  styleUrls: ['./flavor.component.scss']
})
export class FlavorComponent implements OnInit, OnDestroy {

  public flavor!: Flavor;
  public sub: any;
  public id: number | undefined;
  public quantityForm: FormGroup = new FormGroup({
    value: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private flavorsService: FlavorsService,
    private snackBar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id){
        this.getFlavorDetails();
      }
    });
  }

  public getFlavorDetails(): void {
    this.flavorsService.getFlavorById(this.id).subscribe( (result) => {
      this.flavor = result;
    });
  }

  private getQuantity(): number {
    if(this.quantityForm.value.value === ''){
      return 1;
    }
    return this.quantityForm.value.value;
  }

  private getCurrentCart(): FlavorInCart[] {
    const raw_cart = localStorage.getItem("Cart");
    if(raw_cart === null) {
      return [];
    }
    return JSON.parse(raw_cart);
  }

  private actualizeCart(quantityParam: number) : FlavorInCart[] {
    var cart = this.getCurrentCart();
    const quantity = quantityParam;
    for(let i = 0; i < cart.length; i++){
      if (cart[i].flavor.id == this.flavor.id){
        cart[i].quantity = +cart[i].quantity + +quantity;
        return cart;
      }
    }
    const cartElement : FlavorInCart = {"flavor" : this.flavor, "quantity" : quantity};
    cart.push(cartElement);
    return cart;
  }

  public addToCart(): void {
    const quantity = this.getQuantity();
    var cart = this.actualizeCart(quantity);
    localStorage.setItem("Cart", JSON.stringify(cart));
    this.openSnackBar(quantity, this.flavor.name);
  }

  private openSnackBar(quantity: number, flavorName: string): void {
    this.snackBar.open('Added ' + quantity + ' ' + flavorName + ' to cart!', 'Dismiss', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe(); 
  }

}
