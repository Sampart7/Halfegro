import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_helpers/guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { ProductsComponent } from './_components/products/products.component';
import { unsavedChangesGuard } from './_helpers/guards/unsaved-changes.guard';
import { VerifyComponent } from './_components/user/verify/verify.component';
import { ResetPasswordComponent } from './_components/user/reset-password/reset-password.component';
import { UserEditComponent } from './_components/user/user-edit/user-edit.component';
import { StocksComponent } from './_components/stocks/stocks.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: "", runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
    {path: "edit", component: UserEditComponent, canDeactivate: [unsavedChangesGuard]},
    {path: "products", component: ProductsComponent},
    {path: "stocks", component: StocksComponent},
  ]},
  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
