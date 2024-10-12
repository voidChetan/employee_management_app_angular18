import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projectList: IProject[]=[];
  masterSrv = inject(MasterService)
  router = inject(Router)

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.masterSrv.getAllProjects().subscribe((Res: IProject[])=>{
      this.projectList =  Res;
    })
  }
  onEdit(id: number) {
    this.router.navigate(['new-project',id])
  }
  onDelete(id: number) {
    
  }
}
