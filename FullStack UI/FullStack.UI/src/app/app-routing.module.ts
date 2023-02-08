import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employeese/employees-list/employees-list.component';

const routes: Routes = [ //tutaj dodajemy componenty które chcemy wyświetlić w <router-outlet>
  {
    path: "",
    component: EmployeesListComponent
  },  
  {
    path: "employees",
    component: EmployeesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
