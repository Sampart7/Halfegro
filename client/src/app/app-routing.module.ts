import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_helpers/guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { ProductsComponent } from './_components/products/products.component';
import { UserEditComponent } from './_components/userEdit/useredit.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "", runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
    {path: "edit", component: UserEditComponent},
    {path: "products", component: ProductsComponent}
  ]},
  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
