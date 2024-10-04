import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) { }


  getAllDept(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.apiUrl + "GetParentDepartment");
  }
  getChildDeptById(deptid: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }
 
  saveEmp(obj: Employee): Observable<IApiResponse> {
    debugger;
    return this.http.post<IApiResponse>(this.apiUrl + "CreateEmployee", obj);
  }
  getAllEmp(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  updateEmp(obj: Employee): Observable<IApiResponse> {
    debugger;
    return this.http.put<IApiResponse>(this.apiUrl + "UpdateEmployee/" + obj.employeeId, obj);
  }

  deleteEmpById(id: number): Observable<IApiResponse> {
    debugger;
    return this.http.delete<IApiResponse>(this.apiUrl + "DeleteEmployee/" +id);
  }

  saveProject(obj: Employee): Observable<IProject> {
    debugger;
    return this.http.post<IProject>(this.apiUrl + "CreateProject", obj);
  }
  updateProject(obj: IProject): Observable<IProject> {
    debugger;
    return this.http.put<IProject>(this.apiUrl + "UpdateProject/"+obj.projectId, obj);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl + "GetAllProjects");
  }

  getRppjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(this.apiUrl + "/GetProject/"+id);
  }

  getProjectEmp(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(this.apiUrl + "GetAllProjectEmployees");
  }
 
  saveProjectEmp(obj: IProjectEmployee): Observable<IProject> {
    debugger;
    return this.http.post<IProject>(this.apiUrl + "CreateProjectEmployee", obj);
  } 
  updateProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    debugger;
    return this.http.put<IProjectEmployee>(this.apiUrl + "UpdateProjectEmployee/"+obj.empProjectId, obj);
  }

  getDashbvaordData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "GetDashboard");
  }

 
}
