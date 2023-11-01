import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = ['Diploma', 'Graduate', 'PostGraduate'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService
  ) {
    this.empForm = _fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }


  ngOnInit():void{
      this.empForm.patchValue(this.data)
    }

  onFormSubmit() {
    if (this.empForm.valid) {

      if (this.data){

        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
          
            this._coreService.openSnackBar("employee updated")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });

      }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('employee added successfully')
           
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    }
  }
}
