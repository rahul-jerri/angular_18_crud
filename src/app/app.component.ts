import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import Validators
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeeForm: FormGroup;
  employeeobj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.employeeForm = this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      empId: new FormControl(this.employeeobj.empId),
      name: new FormControl(this.employeeobj.name, [Validators.required, Validators.minLength(3)]), // Name validation
      city: new FormControl(this.employeeobj.city, Validators.required), // City validation
      address: new FormControl(this.employeeobj.address, Validators.required), // Address validation
      contactNo: new FormControl(this.employeeobj.contactNo, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/), // Contact number should be a 10-digit number
      ]),
      state: new FormControl(this.employeeobj.state, Validators.required), // State validation
      pincode: new FormControl(this.employeeobj.pinCode, [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/), // Pincode should be a 6-digit number
      ]),
      emailId: new FormControl(this.employeeobj.emailId, [
        Validators.required,
        Validators.email, // Email validation
      ]),
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.employeeForm.controls['empId'].value === 0) {
        this.onSave();
      } else {
        this.onUpdate();
      }
    } else {
      // If the form is invalid, mark all fields as touched to trigger validation messages
      this.employeeForm.markAllAsTouched();
    }
  }

  onSave() {
    const newEmployee = this.employeeForm.value;
    newEmployee.empId = this.employeeList.length + 1;

    this.employeeList.push(newEmployee);

    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    console.log('Updated Employee List:', this.employeeList);

    this.employeeForm.reset({ empId: 0 });
  }

  onEdit(item: EmployeeModel) {
    this.employeeForm.patchValue(item);
  }

  onUpdate() {
    const updatedEmployee = this.employeeForm.value;
    const index = this.employeeList.findIndex((e) => e.empId === updatedEmployee.empId);

    if (index !== -1) {
      this.employeeList[index] = updatedEmployee;
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      console.log('Updated Employee List:', this.employeeList);
    }

    this.employeeForm.reset({ empId: 0 });
  }

  onReset() {
    this.employeeForm.reset({ empId: 0 });
  }

  onDelete(index: number) {
    this.employeeList.splice(index, 1);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    console.log('Updated Employee List:', this.employeeList);
  }

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return (control?.invalid && control?.touched) ?? false;  // Ensure proper order of operations
  }
  
  
}
