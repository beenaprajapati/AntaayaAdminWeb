import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sb-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
  providers: [ItemService]
})
export class CreateItemComponent implements OnInit {
  model: any = {};
  Id: number = 0;
  users = [];
  fileToUpload: any;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  labelFile:string='';
  constructor(private itemService: ItemService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.model.Active = "Y";
    this.route.params.subscribe(params => {
      if (params['Id']) {
        this.Id = parseInt(params['Id']);
        if (this.Id != null) {
          this.itemService.getItemByID(this.Id).subscribe((udata: any) => {
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
  saveItem(form: NgForm) {
    if (form != null) {
      var formObj = form.value;
      if (this.Id != 0) {
        let id = this.Id;
        formObj.ItemID =id;
      }
      
      this.itemService.createItem(formObj, this.Id).subscribe((user: Item) => {
        if (user != null) {
          if (this.Id != 0) {
            this.toastr.success("Item updated successfully");
          }
          else {
            this.toastr.success("Item created successfully");
          }
          this.router.navigate(['/items/item-list']);
          
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
    this.router.navigate(['/items/item-list']);
  }

}
