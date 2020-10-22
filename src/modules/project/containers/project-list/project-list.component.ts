import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '@modules/project/models';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@testing/mocks';
@Component({
  selector: 'sb-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],

  providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
  displayedColumns: string[] = ['Action', 'PorjectName', 'ClientName', 'MobileNo','BujgetValues', ];
  projectList = [];
  //dataSource: any;
  pageSizeList: any[] = [5, 10, 20];
  pageSize: number = 10;
  pageIndex: number = 1;
  gridTotalRecord: number = 0;
  SearchText: string = '';
  sortHeader: string = '';
  Id: number = 0;
  closeResult: string = '';
  rowCount:number;
  @Input('pagination') pagination = false;
  dataSource :any;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: ElementRef; 
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    if (this.pagination) {
      this.dataSource.paginator = paginator;
    }
  }

  constructor(private projectService: ProjectService, private toastr: ToastrService,
    private modalService: NgbModal,
    private zone:NgZone,
    private cd :ChangeDetectorRef) {
      this.dataSource = new MatTableDataSource<Project>([]);
  }

  ngOnInit(): void {
    
      setTimeout(() => {
        
      
        this.bindProjectList(false);
        
        
      },5000);
    
   
  }
  // open modal popup
  open(content: any, Id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Id = Id;
  }
  // close modal popup
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //Get user data
  bindProjectList(searchWithPaging: any) {
    if (this.SearchText.length > 0 && !searchWithPaging) {
      this.pageIndex = 1;
      this.paginator.firstPage();
    }
    this.projectService.getProject(this.SearchText, this.pageIndex, this.pageSize, this.sortHeader).subscribe((user: any) => {
      if(user != null)
      { setTimeout( () => {

        this.dataSource.data=user;
        this.dataSource = new MatTableDataSource<User>(user);
        //this.dataSource = new MatTableDataSource(user);
        for(var i=0;i<user.length ;i++)
        {
        this.rowCount =user[i].RowCount;
        }
        this.gridTotalRecord = this.rowCount;
        this.cd.detectChanges();
        
      },0);
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
  changePage(event: any) {
    this.dataSource.data=[];
    this.pageIndex = (event.pageIndex) + 1;
    this.pageSize = event.pageSize;
    this.bindProjectList(true);
  }
  // Sorting table data
  getGridData() {
    var sortData = this.dataSource.data.sort;
    var sortDataname = this.dataSource.sort?.active;
    var sortDirection = this.dataSource.sort?.direction;
    if (sortDataname == 'ProjectName') {
      sortDataname = 'ProjectName';
    }
    else if (sortDataname == 'ClientName') {
      sortDataname = 'ClientName';
    }
    else if (sortDataname == 'BudgetValues') {
      sortDataname = 'BudgetValues';
    }
    else if (sortDataname == 'Mobile') {
      sortDataname = 'Mobile';
    }
    this.sortHeader = sortDataname + ' ' + sortDirection;

    this.bindProjectList(false);
  }
  //Search table data
  searchValue() {
    this.dataSource.data=[];
    this.bindProjectList(false);
  }
  // Delete User
  deleteProject() {
    if (this.Id != 0) {
      this.projectService.deleteProject(this.Id).subscribe((udata: any) => {
        if (udata != null) {
          this.toastr.success("Project deleted successfully");
          this.modalService.dismissAll("Cross click");
        }
        this.bindProjectList(false);
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
