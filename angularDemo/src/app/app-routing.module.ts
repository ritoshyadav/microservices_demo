import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
      {
        path: '',
        loadChildren: './brand/brand.module#BrandModule'
      },
      {
        path: 'brand',
        loadChildren: './brand/brand.module#BrandModule'
      },
      {
        path: 'tyre',
        loadChildren: './tyre/tyre.module#TyreModule'
      }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
