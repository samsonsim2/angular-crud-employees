import { Component, Inject, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  

  title = 'crud-app';

 
  constructor(private _dialog:MatDialog, private _empService:EmployeeService,private _coreService: CoreService){


    
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this._empService.getEmployees().subscribe({
      next:(res)=>{      
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort=this.sort
        this.dataSource.paginator=this.paginator
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  deleteEmployee(id:number){
    this._empService.deleteEmployees(id).subscribe({
      next:(res)=>{
 
        this._coreService.openSnackBar("employee deleted",'done')
        this.getEmployees();
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployees()
        }
      }
    })
  }


  openEditForm(data:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data: data
    })
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployees()
        }
      }
    })
   
  }


}
