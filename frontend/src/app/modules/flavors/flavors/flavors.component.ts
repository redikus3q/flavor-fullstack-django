import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flavor } from 'src/app/interfaces/flavor';
import { FlavorsService } from 'src/app/services/flavors.service';

@Component({
  selector: 'app-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent implements OnInit {
  public flavors: Flavor[] = [];
  public color = "black";

  constructor(
    private flavorsService: FlavorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFlavors();
  }

  public getAllFlavors(): void {
    this.flavorsService.getAllFlavors().subscribe(result => {
      this.flavors = result;
    });
  }

  public goToFlavor(id: any): void {
    this.router.navigate(['/flavor', id])
  }

}
