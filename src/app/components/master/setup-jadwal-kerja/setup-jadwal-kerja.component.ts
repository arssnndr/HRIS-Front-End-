import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { VoidComponent } from '../../modals/void/void.component';
import { ModalSetupJadwalKerjaCategoryComponent } from './modal-setup-jadwal-kerja-category/modal-setup-jadwal-kerja-category.component';
import { ModalSetupJadwalKerjaDetailComponent } from './modal-setup-jadwal-kerja-detail/modal-setup-jadwal-kerja-detail.component';
import { ModalSetupJadwalKerjaIndividuComponent } from './modal-setup-jadwal-kerja-individu/modal-setup-jadwal-kerja-individu.component';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { utils, writeFileXLSX } from 'xlsx';
import { Router } from '@angular/router';
import { FilterProfileDetailComponent } from './filter-profile-detail/filter-profile-detail.component';

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  akses = this.api.akses.role_setup_jadwal_kerja;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['dashboard']);
  }

  selectedIndex = 0;

  ngOnInit(): void {
    this.getDataJadwalKerjaDetail();
    this.getDataJadwalKerjaCategory();

    this.getDataJadwalKerjaIndividu();

    for (let i = 1; i < 32; i++) {
      this.viewData[0].push(i);
    }
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  formatYearMonth(date: string) {
    return moment(date).format('YYYY-MM');
  }

  // DETAIL
  tabelJadwalKerjaDetail = 'trx_jadwalkerjadetail/';
  dataJadwalKerjaDetail: any;
  dataJadwalKerjaPerMonth: any;
  dataFiltered: any;
  dataSelected: any;
  filterProfileDetail: any = {
    lokasi: '',
    perusahaan: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
  };

  periode = moment().format('YYYY-MM');
  indexProfile = 0;

  getDataJadwalKerjaDetail() {
    this.api
      .getData(
        this.tabelJadwalKerjaDetail +
          '?lokasi_like=' +
          this.filterProfileDetail.lokasi +
          '&perusahaan_like=' +
          this.filterProfileDetail.perusahaan +
          '&divisi_like=' +
          this.filterProfileDetail.divisi +
          '&departemen_like=' +
          this.filterProfileDetail.departemen +
          '&sub_departemen_like=' +
          this.filterProfileDetail.sub_departemen
      )
      .subscribe((res) => {
        this.dataJadwalKerjaDetail = res;
        this.dataSelected = res[0];
        this.getDataJadwalKerjaPerMonth(this.indexProfile, this.periode);
      });
  }

  getDataJadwalKerjaPerMonth(index: number, periode: string) {
    this.indexProfile = index;
    this.dataSelected = this.dataJadwalKerjaDetail[index];
    this.dataJadwalKerjaPerMonth = [];
    this.dataJadwalKerjaDetail[index].jadwal_kerja.forEach((res: any) => {
      if (periode === this.formatYearMonth(res.tgl)) {
        this.dataJadwalKerjaPerMonth.push(res);
      }
    });
  }

  filterProfile() {
    const element = document.getElementById('filterProfileDetail');
    const rect = element!.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: `${rect.bottom}px`,
      right: `${rect.right - rect.left}px`,
    };
    dialogConfig.data = this.filterProfileDetail;
    dialogConfig.autoFocus = false;

    this.dialog
      .open(FilterProfileDetailComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.filterProfileDetail = result;
          this.getDataJadwalKerjaDetail();
        }
      });
  }

  filterNip(nip: any) {
    this.api
      .getData(this.tabelJadwalKerjaDetail + '?nip_like=' + nip.value)
      .subscribe((res) => (this.dataFiltered = res));
  }

  selectNip(data: any) {
    this.dataSelected = data;
  }

  selectJadwalKerja(tgl: string) {
    this.dialog
      .open(ModalSetupJadwalKerjaDetailComponent, {
        data: {
          event: 'editJadwalKerjaDetail',
          editData: this.dataSelected,
          tgl: tgl,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res !== undefined) {
          this.api
            .updateData(this.tabelJadwalKerjaDetail, res, res.id)
            .subscribe(() => {
              this.ngOnInit();
            });
        }
      });
  }

  // CATEGORY
  isButton = false;
  tabelJadwalKerjaCategory = 'trx_jadwalkerjacategory/';
  dataJadwalKerjaCategory: any;

  getDataJadwalKerjaCategory() {
    this.api
      .getData(this.tabelJadwalKerjaCategory)
      .subscribe((res) => (this.dataJadwalKerjaCategory = res));
  }

  tambahJadwalKerjaCategory() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalSetupJadwalKerjaCategoryComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res !== undefined) {
            this.api
              .postData(this.tabelJadwalKerjaCategory, res)
              .subscribe(() => this.getDataJadwalKerjaCategory());
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  editJadwalKerjaCategory(data: any) {
    this.dialog
      .open(ModalSetupJadwalKerjaCategoryComponent, { data: data })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .updateData(this.tabelJadwalKerjaCategory, res, data.id)
            .subscribe(() => this.getDataJadwalKerjaCategory());
        }
      });
  }

  voidCategory(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res === 'ya') {
            this.api
              .deleteData(this.tabelJadwalKerjaCategory + id)
              .subscribe(() => this.getDataJadwalKerjaCategory());
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  // UPLOAD
  viewData: any = [['NIP', 'Nama']];
  isJadwalKerja: any;

  dataForUpload: any = [];

  isValid: any = false;
  isFile = false;
  periodeUpload = moment().format('YYYY-MM');
  fileName: string = '';

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length > 1) {
      throw new Error('Cannot use multiple files');
    } else {
      this.fileName = evt.target.files[0].name;

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.viewData = <XLSX.AOA2SheetOpts>(
          XLSX.utils.sheet_to_json(ws, { header: 1 })
        );
        this.isJadwalKerja = <XLSX.AOA2SheetOpts>(
          XLSX.utils.sheet_to_json(ws, { header: 1 })
        );

        this.isFile = true;

        this.api
          .getData(environment.tabelKaryawan)
          .subscribe((res) =>
            this.api
              .getData(environment.tabelJadwalKerja)
              .subscribe((ress) => this.validation(res, ress))
          );
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  validation(dataKaryawan: any, dataJadwalKerja: any) {
    this.viewData.forEach((res: any, index: number) => {
      if (index > 0) {
        res.forEach((ress: any, ind: number) => {
          if (ind < 2) {
            for (let emp of dataKaryawan) {
              if (ind === 0) {
                if (emp.nip.toString() === ress.toString()) {
                  this.isJadwalKerja[index][ind] = true;
                  break;
                } else {
                  this.isJadwalKerja[index][ind] = false;
                }
              }
              if (ind === 1) {
                if (emp.nama_lengkap === ress) {
                  this.isJadwalKerja[index][ind] = true;
                  break;
                } else {
                  this.isJadwalKerja[index][ind] = false;
                }
              }
            }
          }
          if (ind > 1) {
            for (let jdwl of dataJadwalKerja) {
              if (jdwl.id_jadwal_kerja === ress || ress === 'OFF') {
                this.isJadwalKerja[index][ind] = true;
                break;
              } else {
                this.isJadwalKerja[index][ind] = false;
              }
            }
          }
        });
      }
    });
    const tmp: any[] = [];
    this.isJadwalKerja.forEach((res: any, index: number) => {
      if (index > 0) {
        tmp.push(...res.filter((ress: any) => ress === false));
      }
    });
    this.isValid =
      tmp.filter((res: any) => res === false)[0] === undefined ? true : false;
  }

  uploadData() {
    this.dataForUpload = this.viewData.map((array: any) => {
      const obj: any = {};

      array.forEach((value: any, index1: number) => {
        obj[this.viewData[0][index1]] = value;
      });

      return obj;
    });

    this.dataForUpload.splice(0, 1);

    this.api
      .postData(environment.tabelJadwalKerjaUpload, this.dataForUpload)
      .subscribe(() => alert('Data berhasil diupload'));
  }

  // INDIVIDU
  tabelJadwalKerjaIndividu = 'trx_jadwalkerjaindividu/';
  dataJadwalKerjaIndividu: any;

  getDataJadwalKerjaIndividu() {
    this.api
      .getData(this.tabelJadwalKerjaIndividu)
      .subscribe((res) => (this.dataJadwalKerjaIndividu = res));
  }

  tambahJadwalKerjaIndividu() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalSetupJadwalKerjaIndividuComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res !== undefined) {
            this.api
              .postData(this.tabelJadwalKerjaIndividu, res)
              .subscribe(() => this.getDataJadwalKerjaIndividu());
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  editJadwalKerjaIndividu(data: any) {
    this.dialog
      .open(ModalSetupJadwalKerjaIndividuComponent, { data: data })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined)
          this.api
            .updateData(this.tabelJadwalKerjaIndividu, res, data.id)
            .subscribe(() => this.getDataJadwalKerjaIndividu());
        else this.getDataJadwalKerjaIndividu();
      });
  }

  voidIndividu(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res === 'ya') {
            this.api
              .deleteData(this.tabelJadwalKerjaIndividu + id)
              .subscribe(() => this.getDataJadwalKerjaIndividu());
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  printData(name: string) {
    if (this.akses.download) {
      let header: any[] = [];
      let content: any;
      let column;
      let gap = 0;

      switch (name) {
        case 'Setup Jadwal Kerja Detail':
          header = [
            ['A1', 'NIP'],
            ['A2', 'Nama Karyawan'],
            ['A3', 'Perusahaan'],
            ['A4', 'Divisi'],
            ['A5', 'Departemen'],
            ['A6', 'Sub Departemen'],
            ['A7', 'Periode'],
            ['B1', ': ' + this.dataSelected.nip],
            ['B2', ': ' + this.dataSelected.nama_lengkap],
            ['B3', ': ' + this.dataSelected.perusahaan],
            ['B4', ': ' + this.dataSelected.divisi],
            ['B5', ': ' + this.dataSelected.departemen],
            ['B6', ': ' + this.dataSelected.sub_departemen],
            ['B7', ': ' + moment(this.periode, 'YYYY-MM').format('MMM YYYY')],
            ['G1', 'Tanggal Cetak'],
            ['G2', 'User'],
            ['H1', ': ' + moment().format('DD MMM YYYY')],
            ['H2', ': ' + this.api.akses.username],
          ];
          content = this.dataJadwalKerjaPerMonth.map((res: any) => ({
            Tanggal: moment(res.tgl).format('DD MMM YYYY'),
            Hari: res.hari,
            'ID Jadwal Kerja': res.id_jadwal_kerja,
            'Jadwal Kerja': res.masuk + ' - ' + res.keluar,
            'Jadwal Istirahat': res.start_break + ' - ' + res.end_break,
            'Jam masuk': res.masuk,
            'Jam Keluar': res.keluar,
            Total: res.total,
          }));

          gap = 9;
          break;

        case 'Setup Jadwal Kerja Category':
          header = [
            ['A1', name],
            ['J1', 'Tanggal Cetak'],
            ['J2', 'User'],
            ['K1', ': ' + moment().format('DD MMM YYYY')],
            ['K2', ': ' + this.api.akses.username],
          ];
          content = this.dataJadwalKerjaCategory.map((res: any) => ({
            Lokasi: res.lokasi,
            Divisi: res.divisi,
            Departemen: res.departemen,
            'Sub Departemen': res.sub_departemen,
          }));

          this.dataJadwalKerjaCategory.forEach((res: any, index: number) => {
            res.jadwal_kerja.forEach((ress: any) => {
              content[index][ress.hari] = ress.id_jadwal_kerja;
            });
          });

          gap = 5;
          break;

        case 'Setup Jadwal Kerja Individu':
          header = [
            ['A1', name],
            ['A2', 'Dari :'],
            ['B2', this.formatDate(this.dataJadwalKerjaIndividu[0].dari)],
            ['C2', 's.d'],
            ['D2', this.formatDate(this.dataJadwalKerjaIndividu[0].sampai)],
            ['J1', 'Tanggal Cetak'],
            ['J2', 'User'],
            ['K1', ': ' + moment().format('DD MMM YYYY')],
            ['K2', ': ' + this.api.akses.username],
          ];
          content = this.dataJadwalKerjaIndividu.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            Perusahaan: res.perusahaan,
            Departemen: res.departemen,
          }));

          this.dataJadwalKerjaIndividu.forEach((res: any, index: number) => {
            res.jadwal_kerja.forEach((ress: any) => {
              content[index][ress.hari] = ress.id_jadwal_kerja;
            });
          });

          gap = 5;
          break;
      }

      if (content != undefined) {
        column =
          Object.keys(content[0]).length > 25
            ? 'A' +
              String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
            : String.fromCharCode(Object.keys(content[0]).length + 64);

        const ws = utils.json_to_sheet(content);
        const wsTemp = utils.json_to_sheet(content);

        let length = Number(ws['!ref']?.split(column, 2)[1]);

        ws['!ref'] = 'A1:' + column + (length + gap);
        for (let i = 1; i <= gap; i++) {
          Object.keys(content[0]).forEach((_, index) => {
            index > 25
              ? (ws['A' + String.fromCharCode(65 + index - 26) + i] = {
                  t: 's',
                  v: '',
                })
              : (ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' });
          });
        }

        header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

        for (let i = 0; i < length; i++) {
          Object.keys(content[0]).forEach((_, index) => {
            index > 25
              ? (ws['A' + String.fromCharCode(65 + index - 26) + (i + gap)] =
                  wsTemp['A' + String.fromCharCode(65 + index - 26) + (i + 1)])
              : (ws[String.fromCharCode(65 + index) + (i + gap)] =
                  wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
          });
        }

        const wb = utils.book_new();

        utils.book_append_sheet(wb, ws);
        writeFileXLSX(wb, name + '.xlsx');
      }
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }
}
