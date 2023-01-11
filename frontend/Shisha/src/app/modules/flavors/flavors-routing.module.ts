import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlavorComponent } from './flavor/flavor.component';
import { FlavorsComponent } from './flavors/flavors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flavors',
    pathMatch: 'full' // incarcam pe toata pagina ce se intampla pe ruta asta
  },
  {
    path: 'flavors',
    component: FlavorsComponent
  },
  {
    path: 'flavor/:id',
    component: FlavorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlavorsRoutingModule { }
