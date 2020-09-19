import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sb-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {
  model: any = {};
  users=[];
  fileToUpload:any;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.model.active="N";
    this.getUserList();
  }
  saveUser(form:NgForm)
  {
    debugger
    var formObj=form.value;
    if(this.fileToUpload != null)
    {
      formObj.photo=this.fileToUpload.name;
    }
    if(formObj.active == true)
    {
      formObj.active == "Y";
    }
    else{
      formObj.active == "N";
    }
    this.userService.createUser(formObj).subscribe((user: User)=>{
      console.log("user created, ", user);
    });
  }
  handleFileInput(files:any) {
    debugger
    this.fileToUpload = files.item(0);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getUserList()
  {
    // this.userService.getUser().subscribe((data)=>{
    //   console.log("user get, ", data);
    // });
  }
  
    

}
