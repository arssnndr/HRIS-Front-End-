import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lokasi } from 'src/app/interfaces/lokasi';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-lokasi',
  templateUrl: './modal-lokasi.component.html',
  styleUrls: ['./modal-lokasi.component.css'],
})
export class ModalLokasiComponent implements OnInit {
  isTambah = false;
  isDelete = false;
  isEdit = false;

  idValue = 0;
  keteranganValue = '';
  inisialValue = '';
  alamatValue = '';

  lokasi: Lokasi | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;

      this.idValue = this.data.data;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;

      this.idValue = this.data.data.id;
      this.keteranganValue = this.data.data.keterangan;
      this.inisialValue = this.data.data.inisial_lokasi;
      this.alamatValue = this.data.data.alamat_lokasi;
    }
  }

  throwResult() {
    this.lokasi = {
      id: this.idValue,
      keterangan: this.keteranganValue,
      inisial_lokasi: this.inisialValue,
      alamat_lokasi: this.alamatValue,
    };
    this.api.throwData(this.lokasi);
  }
}