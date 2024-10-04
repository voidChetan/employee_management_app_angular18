import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit,OnDestroy {


  isFormVisiable = signal<boolean>(false);
  masterSrv= inject(MasterService); 

  parentDept$ : Observable<IParentDept[]> = new Observable<IParentDept[]>(); 

  employeeList : Employee[] =[];
  childDeptList =  signal<IChildDept[]>([]);

  isLoader = signal<boolean>(true);
  isApiCallInProgress = signal<boolean>(false);

  parentDeptId: number =  0;
  employeeObj: Employee = new Employee();

  subscriptionList: Subscription[] = [];

  constructor( private chageDetection:ChangeDetectorRef){
    this.parentDept$ =  this.masterSrv.getAllDept().pipe(
      map((data:IApiResponse)=>{
        return data.data
      })
    );
  }


  ngOnInit(): void { 
    this.getEmployees();
  } 

  getEmployees() {
    debugger
    this.subscriptionList.push(this.masterSrv.getAllEmp().subscribe((res:Employee[])=>{ 
      debugger
       this.employeeList =res;
       this.chageDetection.detectChanges();
       this.isLoader.set(false)
     }))
    
  }

  onParentDeptChange() {
    const childDpet =  this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((Res: IApiResponse)=>{
      this.childDeptList.set(Res.data) 
    })
    this.subscriptionList.push(childDpet)
    
  }
  onSave() {
    debugger;
    if(this.isApiCallInProgress() == false) {
      this.isApiCallInProgress.set(true);
      this.masterSrv.saveEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
        debugger;
        alert("Employee Created")
        this.getEmployees();
        this.isApiCallInProgress.set(false);
        this.employeeObj = new Employee();
      },error=>{
        alert('API Error')
        this.isApiCallInProgress.set(false);
      })
    }
   
  }
  onEdit(data: Employee) {
    this.employeeObj =  data;
    this.isFormVisiable.set(true)
  }
  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
      debugger;
      alert("Employee Update")
      this.getEmployees();
      this.employeeObj = new Employee();
    },error=>{
      alert('API Error')
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure want ot Delete");
    if(isDelete) {
      this.masterSrv.deleteEmpById(id).subscribe((res:IApiResponse)=>{
        debugger;
        const index =  this.employeeList.findIndex((m:Employee)=>m.employeeId ==id);
        this.employeeList.splice(index,1)
        this.chageDetection.detectChanges();
        alert("Employee Deleted") 
      },error=>{
        alert('API Error')
      })
    }
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub:Subscription)=>{
      sub.unsubscribe();
    })
  }
}
