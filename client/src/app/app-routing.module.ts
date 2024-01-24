import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './_helpers/guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "", runGuardsAndResolvers: 'always', canActivate: [authGuard], children: []},
  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
