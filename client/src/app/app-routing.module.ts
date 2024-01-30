import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_helpers/guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { ProductsComponent } from './_components/products/products.component';
import { UserEditComponent } from './_components/user-edit/user-edit.component';
import { unsavedChangesGuard } from './_helpers/guards/unsaved-changes.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "", runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
    {path: "edit", component: UserEditComponent, canDeactivate: [unsavedChangesGuard]},
    {path: "products", component: ProductsComponent}
  ]},
  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
