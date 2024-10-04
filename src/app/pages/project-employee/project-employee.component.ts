import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit {

  projectEmployeeList = signal<IProjectEmployee[]>([]);
  masterSrv = inject(MasterService)
  form: FormGroup = new FormGroup({})
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;
  EmpList$ : Observable<Employee[]> = new Observable<Employee[]>;

  constructor() {
    this.initializeForm();
    this.projectList$ = this.masterSrv.getAllProjects();
    this.EmpList$ = this.masterSrv.getAllEmp();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  initializeForm() {
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
    })
  }

  getAllData() {
    this.masterSrv.getProjectEmp().subscribe((Res: IProjectEmployee[]) => {
      this.projectEmployeeList.set(Res)
    })
  }
  onSave() {
    const formVlaue = this.form.value;
    this.masterSrv.saveProjectEmp(formVlaue).subscribe((res:IProject)=>{
      debugger;
      alert("Employee Added to Project Created") 
      this.getAllData();
     this.form.reset();
    },error=>{
      alert('API Error')
    })
  }
}
