import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/modules/flavors/flavors.module').then(m => m.FlavorsModule),
  },
  {
    path: 'aboutus',
    loadChildren: () => import('src/app/modules/aboutus/aboutus.module').then(m => m.AboutusModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    // canActivate: [AuthGuard],
    loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'cart',
    // canActivate: [AuthGuard],
    loadChildren: () => import('src/app/modules/cart/cart.module').then(m => m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
