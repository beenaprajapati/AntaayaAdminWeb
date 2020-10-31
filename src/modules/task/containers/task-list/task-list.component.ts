import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '@modules/project/models';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@testing/mocks';
import { Task } from '@modules/task/models';
@Component({
  selector: 'sb-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['Action', 'Task', 'Status', 'Remark' ];
  taskList = [];
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

  constructor(private taskService: TaskService, private toastr: ToastrService,
    private modalService: NgbModal,
    private zone:NgZone,
    private cd :ChangeDetectorRef) {
      this.dataSource = new MatTableDataSource<Task>([]);
  }

  ngOnInit() {
    this.bindTaskList(false);
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
  bindTaskList(searchWithPaging: any) {
    if (this.SearchText.length > 0 && !searchWithPaging) {
      this.pageIndex = 1;
      this.paginator.firstPage();
    }
    this.taskService.getTask(this.SearchText, this.pageIndex, this.pageSize, this.sortHeader).subscribe((task: any) => {
      if(task.items.length > 0)
      { 
        this.dataSource.data=task.items;
        for(var i=0;i<task.items.length ;i++)
        {
        this.rowCount =task.items[i].RowCount;
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
  changePage(event: any) {
    this.dataSource.data=[];
    this.pageIndex = (event.pageIndex) + 1;
    this.pageSize = event.pageSize;
    this.bindTaskList(true);
  }
  // Sorting table data
  getGridData() {
    var sortData = this.dataSource.data.sort;
    var sortDataname = this.dataSource.sort?.active;
    var sortDirection = this.dataSource.sort?.direction;
    if (sortDataname == 'Task') {
      sortDataname = 'Task';
    }
    else if (sortDataname == 'Status') {
      sortDataname = 'Status';
    }
    else if (sortDataname == 'Remark') {
      sortDataname = 'Remark';
    }
    this.sortHeader = sortDataname + ' ' + sortDirection;

    this.bindTaskList(false);
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //Search table data
  searchValue() {
    this.dataSource.data=[];
    this.bindTaskList(false);
  }
  deleteProject() {
    if (this.Id != 0) {
      this.taskService.deleteTask(this.Id).subscribe((udata: any) => {
        if (udata != null) {
          this.toastr.success("task deleted successfully");
          this.modalService.dismissAll("Cross click");
        }
        this.bindTaskList(false);
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
