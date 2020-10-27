import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
@Component({
  selector: 'sb-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['Action','FirstName', 'MiddleName', 'LastName', 'Email'];
  users=[{'Id':1,'FirstName':'abc'}];
  //dataSource =new MatTableDataSourc(any);
  dataSource :any;
  pageSizeList: any[] = [5, 10, 20];
  pageSize: number = 10;
  pageIndex: number = 1;
  gridTotalRecord: number=0;
  SearchText: string = '';
  sortHeader: string = '';
  Id:number=0;
  closeResult: string='';
  rowCount :number =0;
  keyword:string='';
  @Input('pagination') pagination =false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: ElementRef;
  constructor(private userService:UserService,private toastr:ToastrService,
    private modalService:NgbModal,private ele:ElementRef) {
      this.dataSource = new MatTableDataSource<User>([]);
  }

  
  ngOnInit() {
    this.bindUserList(false);
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.paginator.firstPage();
    }
    this.userService.getUser(this.SearchText,this.pageIndex, this.pageSize, this.sortHeader).subscribe((user: any)=>{
      if(user.items.length >0)
      { 
        this.dataSource.data=user.items;
        console.log(user);
        for(var i=0;i<user.items.length ;i++)
        {
        this.rowCount =user.items[i].RowCount;
        }
        this.gridTotalRecord = this.rowCount;
      }
      else {
        this.dataSource.data= [];
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
    this.dataSource.data=[];
    this.gridTotalRecord = 0;
  }
  // Page change
  changePage(event:any) {
    this.dataSource.data=[];
    this.pageIndex = (event.pageIndex) + 1;
    this.pageSize = event.pageSize;
    this.bindUserList(true);
  }
  // Sorting table data
  getGridData() {
    var sortData = this.dataSource.data.sort;
    var sortDataname = this.dataSource.sort?.active;
    var sortDirection = this.dataSource.sort?.direction;
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
    this.dataSource.data=[];
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
          //alert(udata);
            this.toastr.success("User deleted successfully");
           this.modalService.dismissAll("Cross click");

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
