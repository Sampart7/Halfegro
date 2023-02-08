import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [
    {
      id: "1",
      name: "Hubert Jonak",
      email: "hubibubi@gmail.com",
      phone: 420692137,
      salary: 313.49,
      department: "Chester-Webing"
    },
    {
      id: "2",
      name: "Maciej Matuszewski",
      email: "olkoholik@gmail.com",
      phone: 213742069,
      salary: 528.31,
      department: "Chester-Gaming"
    }

  ];
  constructor() {}

  ngOnInit(): void {
  }

}
