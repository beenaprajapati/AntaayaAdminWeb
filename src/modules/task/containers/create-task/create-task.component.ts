import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService} from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '@modules/project/services';
import { UserService } from '@modules/users/services';

@Component({
  selector: 'sb-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [TaskService,ProjectService,UserService]
})
export class CreateTaskComponent implements OnInit {
  time = {hour: 13, minute: 30};
  projects=[];
  users=[];
  model: any = {};
  Id:number=0;
  taskList=[];
  fileToUpload:any;
  labelFile :string;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: ElementRef; 
  constructor(private taskService:TaskService,private toastr:ToastrService,private route:ActivatedRoute,
              private router:Router,
              private projectService:ProjectService,
              private userService:UserService) {
                
               }

  ngOnInit() 
  {
    this.bindProject();
    this.bindUser();
    this.route.params.subscribe(params => {
      if (params['Id']) {
      this.Id= params['Id'];
      if(this.Id !=null)
      {
        this.taskService.getTaskByID(this.Id).subscribe((udata:any) =>
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
  bindProject()
  {
    var pageSize=1000000;
    this.projectService.getProject('', '', pageSize, '').subscribe((user: any) => {
      if(user.items.length > 0)
      { 
        this.projects=user.items; 
      }
      
    },
      err => {
        if (err != null)
          if (err != null) {

            this.toastr.error(err["message"]);
          }
          else {
            this.toastr.error(err["message"]);
          }
      });
  }
  bindUser()
  {
    var pageSize=1000000;
    this.userService.getUser('', '', pageSize, '').subscribe((user: any) => {
      if(user.items.length > 0)
      { 
        this.users=user.items; 
      }
      
    },
      err => {
        if (err != null)
          if (err != null) {

            this.toastr.error(err["message"]);
          }
          else {
            this.toastr.error(err["message"]);
          }
      });
  }
  // Save user data
  saveTask(form:NgForm)
  {
    if(form != null)
    {
      var formObj=form.value;
      if (this.Id != 0) {
        let id = this.Id;
        if (this.fileToUpload == null) {
          formObj.Photo =this.labelFile;
        }
        formObj.TaskID =id;
      }
      if(this.fileToUpload != null)
      {
        formObj.Photo=this.fileToUpload.name;
      }
      this.taskService.createTask(formObj,this.Id).subscribe((task: Task)=>{
        if(task !=null)
        {
          if(this.Id ==0)
          {
            this.toastr.success("Task created successfully");
          }
          else{
            this.toastr.success("Task updated successfully");
          }
        }
       
        this.router.navigate(['/task/task-list']);
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
  Cancel()
  {
    this.router.navigate(['/task/task-list']);
  }
  
}
