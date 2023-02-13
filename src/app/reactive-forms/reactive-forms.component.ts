import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  employeeForm : FormGroup
  employees : Employee[] = []
  isSubmit: boolean = false;
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group( {
      firstName : ['', [Validators.required]],
      lastName : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],
      company : ['', Validators.required],
      gender : ['', Validators.required],
      dob : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    })
    this.employees = [
      {
          "firstName": "Sri",
          "lastName": "Ravi",
          "email": "sri@gmail.com",
          "phone": "9898998989",
          "company": "Acc",
          "gender": "male",
          "dob": "2023-02-16",
          "password": "HELLO",
          "confirmPassword": "HELLO"
      },
      {
          "firstName": "Sankar",
          "lastName": "Rao",
          "email": "sankarrao@gmail.com",
          "phone": "9898099889",
          "company": "Cap",
          "gender": "male",
          "dob": "2023-02-01",
          "password": "HELLO",
          "confirmPassword": "HELLO"
      }
  ]
  }

  ngOnInit(): void {
    console.log("I am on ngOnit")
    console.log(this.employeeForm.get('firstName')?.errors)
  }
  onRegister() {
    this.isSubmit = true;
    if(this.employeeForm.valid) {
      const email = this.employeeForm.get('email')?.value
      const index = this.employees.findIndex(item=> item.email==email)
      if(index) {
        this.employees.splice(index,1)
      }
      this.employees.push(this.employeeForm.value);
    }
    console.log("I am in onRegister");
    console.log(this.employeeForm.value);
  }

  onEdit(employee : Employee) {
    this.employeeForm.patchValue(this.employees.find(item=> item.email==employee.email) || {})
  }

  onDelete(employee : Employee) {
    const index = this.employees.findIndex(item=> item.email==employee.email)
    this.employees.splice(index,1)
  }
}



export class Employee {
      firstName: string | undefined
      lastName: string | undefined
      email: string | undefined
      phone: string | undefined
      company: string | undefined
      gender: string | undefined
      dob: string | undefined
      password: string | undefined
      confirmPassword: string | undefined
}
