import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sb-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {
  model: any = {};
  Id: number = 0;
  users = [];
  fileToUpload: any;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  labelFile:string='';
  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.model.Active = "Y";
    this.route.params.subscribe(params => {
      if (params['Id']) {
        this.Id = parseInt(params['Id']);
        if (this.Id != null) {
          this.userService.getUserByID(this.Id).subscribe((udata: any) => {
            if (udata != null) {
              this.model = udata.items[0];
              this.labelFile =this.model.Photo;
            }
          })
        }
      }
    });
  }
  // Save user data
  saveUser(form: NgForm) {
    if (form != null) {
      var formObj = form.value;
      if (this.Id != 0) {
        let id = this.Id;
        formObj.USerId =id;
        if (this.fileToUpload == null) {
          formObj.Photo =this.labelFile;
        }

      }
      if (this.fileToUpload != null) {
        formObj.Photo = this.fileToUpload.name;
      }
      if (formObj.Active == true) {
        formObj.Active == "Y";
      }
      else {
        formObj.Active == "N";
      }

      this.userService.createUser(formObj, this.Id).subscribe((user: User) => {
        if (user != null) {
          if (this.Id != 0) {
            this.toastr.success("User updated successfully");
          }
          else {
            this.toastr.success("User created successfully");
          }
          this.router.navigate(['/users/user-list']);
          
        }
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
  handleFileInput(files: any) {
    if (files != null)
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
    this.router.navigate(['/users/user-list']);
  }

}
