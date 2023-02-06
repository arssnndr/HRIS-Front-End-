import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalOtoritasComponent } from './modal-otoritas/modal-otoritas.component';

@Component({
  selector: 'app-otoritas',
  templateUrl: './otoritas.component.html',
  styleUrls: ['./otoritas.component.css'],
})
export class OtoritasComponent {
  table = 'ms_userid/';
  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  nip = true;
  username = false;
  catchResult: any;
  getMaxId = 0;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalOtoritasComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.table + id).subscribe(() => {
          this.api.getData(this.table).subscribe((res) => {
            this.getMaxId = res[res.length - 1].id;
          });
          this.length = this.length - 1;
          this.getPageData();
        });
      }
    });
  }

  editData(data: any) {
    const dialogRef = this.dialog.open(ModalOtoritasComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        let id = this.catchResult.id;
        this.api.updateData(this.table, data, id).subscribe((res) => {
          this.getPageData();
        });
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPageData();
  }

  getAllData() {
    if (this.dataSearch.length === 0) {
      this.api.getData(this.table).subscribe((res) => {
        this.getMaxId = res[res.length - 1].id;
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      if (this.nip) {
        this.api
          .getData(this.table + '?nip_like=' + this.dataSearch)
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.nip = false;
              this.username = true;
              this.getAllData();
            } else {
              this.getPageData();
            }
          });
      } else if (this.username) {
        this.api
          .getData(this.table + '?username_like=' + this.dataSearch)
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.username = false;
              this.nip = true;
              this.getAllData();
            } else {
              this.getPageData();
            }
          });
      }
    }
  }

  getPageData() {
    if (this.dataSearch.length === 0) {
      this.api
        .getData(
          this.table +
            '?_page=' +
            (this.pageIndex + 1) +
            '&_limit=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      if (this.nip) {
        this.api
          .getData(
            this.table +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&nip_like=' +
              this.dataSearch
          )
          .subscribe((res) => {
            this.data = res;
          });
      } else if (this.username) {
        this.api
          .getData(
            this.table +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&username_like=' +
              this.dataSearch
          )
          .subscribe((res) => {
            this.data = res;
          });
      }
    }
  }

  searchData(data: any) {
    this.dataSearch = data;
    this.pageIndex = 0;
    this.getAllData();
    this.getPageData();
  }
}