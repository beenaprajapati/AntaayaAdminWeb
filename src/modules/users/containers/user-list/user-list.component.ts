import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'sb-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['Action','FirstName', 'MiddleName', 'LastName', 'Email'];
  users=[{'Id':1,'FirstName':'abc'}];
  dataSource :any;
  pageSizeList: any[] = [5, 10, 20];
  pageSize: number = 10;
  pageIndex: number = 1;
  gridTotalRecord: number=0;
  SearchText: string = '';
  sortHeader: string = '';
  Id:number=0;
  closeResult: string='';
  @Input('pagination') pagination =false;
  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    if (this.pagination) {
      this.dataSource.paginator = paginator;
    }
  }
  
  constructor(private userService:UserService,private toastr:ToastrService,
    private modalService:NgbModal) {
  }

  ngOnInit(): void {
    this.bindUserList(false);
  }
  // open modal popup
  open(content:any,Id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Id=Id;
  }
  // close modal popup
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //Get user data
  bindUserList(searchWithPaging:any)
  {
    if (this.SearchText.length > 0 && !searchWithPaging) {
      this.pageIndex = 1;
      this.dataSource.firstPage();
    }this.dataSource=this.users;
    this.userService.getUser(this.SearchText,this.pageIndex, this.pageSize, this.sortHeader).subscribe((user: any)=>{
      if(user != null)
      {
        this.dataSource=this.users;
        this.gridTotalRecord = user.params.count;
      }
      else {
        this.dataSource = null;
        this.setEmptyGrid();
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
  //Empty grid
  setEmptyGrid() {
    this.dataSource = null;
    this.gridTotalRecord = 0;
  }
  // Page change
  changePage(event:any) {
    this.dataSource = null;
    this.pageIndex = (event.pageIndex) + 1;
    this.pageSize = event.pageSize;
    this.bindUserList(true);
  }
  // Sorting table data
  getGridData() {
    var sortData = this.dataSource.sort;
    var sortDataname = this.dataSource.sort.active;
    var sortDirection = this.dataSource.sort.direction;
    if (sortDataname == 'FirstName') {
      sortDataname = 'FirstName';
    }
    else if (sortDataname == 'MiddleName') {
      sortDataname = 'MiddleName';
    }
    else if (sortDataname == 'LastName') {
      sortDataname = 'LastName';
    }
    this.sortHeader = sortDataname + ' ' + sortDirection;

    this.bindUserList(false);
  }
  //Search table data
  searchValue() {
    this.dataSource = null;
    this.bindUserList(false);
  }
  // Delete User
  deleteUser()
  {
    if(this.Id !=0)
    {
      this.userService.deleteUser(this.Id).subscribe((udata:any) =>
      {
        if(udata != null)
        {
            this.toastr.success("User deleted successfully");
        }
        this.bindUserList(false);
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
  }

}
