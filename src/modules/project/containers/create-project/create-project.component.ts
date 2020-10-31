import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectService} from '../../services/project.service';
import { Project } from '../../models/project.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'sb-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [ProjectService]
})
export class CreateProjectComponent implements OnInit {
  model: any = {};
  Id:number=0;
  projectList=[];
  fileToUpload:any;
  labelFile :string;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: ElementRef; 
  constructor(private projectService:ProjectService,private toastr:ToastrService,private route:ActivatedRoute,
              private router:Router) {
                
               }

  ngOnInit() 
  {
    this.route.params.subscribe(params => {
      if (params['Id']) {
      this.Id= params['Id'];
      if(this.Id !=null)
      {
        this.projectService.getProjectByID(this.Id).subscribe((udata:any) =>
        {
          if(udata != null)
          {
            this.model=udata.items[0];
            this.labelFile= this.model.FileUpload;
          }
        })
      }
    }
    });
  }
  // Save user data
  saveProject(form:NgForm)
  {
    if(form != null)
    {
      var formObj=form.value;
      if (this.Id != 0) {
        let id = this.Id;
        if (this.fileToUpload == null) {
          formObj.Photo =this.labelFile;
        }
        formObj.ProjectID =id;
      }
      if(this.fileToUpload != null)
      {
        formObj.Photo=this.fileToUpload.name;
      }
      this.projectService.createProject(formObj,this.Id).subscribe((project: Project)=>{
        if(project !=null)
        {
          if(this.Id ==0)
          {
            this.toastr.success("Project created successfully");
          }
          else{
            this.toastr.success("Project updated successfully");
          }
        }
       
        this.router.navigate(['/project/project-list']);
      },
      err => {
        if (err != null)
          if (err != null && err.error.message != null) {
            this.toastr.error(err.error.message);
          }
          else {
            this.toastr.error(err["message"]);
          }
        else {
          this.toastr.error(err["message"]);
        }
      });
    }
  }

  // change profile photo
  handleFileInput(files:any) {
    if(files != null)
    this.fileToUpload = files.item(0);
  } 
  // validation of mobile 
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
}
