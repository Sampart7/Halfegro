import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [ //tutaj dodajemy componenty które chcemy wyświetlić w <router-outlet>
  {
    path: "",
    component: HomePageComponent
  },  
  {
    path: "employees",
    component: EmployeesListComponent
  },
  {
    path: "employees/add",
    component: AddEmployeeComponent
  },
  {
    path: "employees/edit/:id",
    component: EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
