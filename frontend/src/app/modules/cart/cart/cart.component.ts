import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flavor } from 'src/app/interfaces/flavor';
import { FlavorInCart } from 'src/app/interfaces/flavorInCart';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public shopping_cart: FlavorInCart[] | any;

  constructor(private router: Router, private paymentService: PaymentService) {}

  private getCurrentCart(): FlavorInCart[] {
    const raw_cart = localStorage.getItem('Cart');
    if (raw_cart === null) {
      return [];
    }
    return JSON.parse(raw_cart);
  }

  ngOnInit(): void {
    this.shopping_cart = this.getCurrentCart();
  }

  removeElement(index: number): void {
    this.shopping_cart.splice(index, 1);
    localStorage.setItem('Cart', JSON.stringify(this.shopping_cart));
  }

  modifyElement(index: number, add: boolean): void {
    if (add) {
      this.shopping_cart[index].quantity =
        +this.shopping_cart[index].quantity + 1;
    } else {
      this.shopping_cart[index].quantity =
        +this.shopping_cart[index].quantity - 1;
      if (this.shopping_cart[index].quantity == 0) {
        this.removeElement(index);
      }
    }
    localStorage.setItem('Cart', JSON.stringify(this.shopping_cart));
  }

  checkout(): void {
    const body = {
      cart: this.shopping_cart,
    };
    var response = this.paymentService.checkout(body).subscribe((result) => {
      if (!result) {
        throw new Error();
      }
      window.location.href = result;
    });
  }

  goToFlavors(): void {
    this.router.navigate(['/flavors']);
  }
}
