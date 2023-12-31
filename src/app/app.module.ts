import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BagianKerjaComponent } from './components/master/bagian-kerja/bagian-kerja.component';
import { PerusahaanComponent } from './components/master/perusahaan/perusahaan.component';
import { LokasiComponent } from './components/master/lokasi/lokasi.component';
import { UserComponent } from './components/master/user/user.component';
import { KaryawanComponent } from './components/master/karyawan/karyawan.component';
import { JadwalKerjaComponent } from './components/master/jadwal-kerja/jadwal-kerja.component';
import { SetupJadwalKerjaComponent } from './components/master/setup-jadwal-kerja/setup-jadwal-kerja.component';
import { KalenderKerjaComponent } from './components/master/kalender-kerja/kalender-kerja.component';
import { MesinFingerComponent } from './components/master/mesin-finger/mesin-finger.component';
import { SetupMesinFingerComponent } from './components/master/setup-mesin-finger/setup-mesin-finger.component';
import { StatusKehadiranComponent } from './components/status-kehadiran/status-kehadiran.component';
import { ListKehadiranComponent } from './components/list-kehadiran/list-kehadiran.component';
import { LemburComponent } from './components/lembur/lembur.component';
import { GantiNipComponent } from './components/ganti-nip/ganti-nip.component';
import { ModalBagianKerjaComponent } from './components/master/bagian-kerja/modal-bagian-kerja/modal-bagian-kerja.component';
import { ModalPerusahaanComponent } from './components/master/perusahaan/modal-perusahaan/modal-perusahaan.component';
import { ModalLokasiComponent } from './components/master/lokasi/modal-lokasi/modal-lokasi.component';
import { ModalUserComponent } from './components/master/user/modal-user/modal-user.component';
import { ModalKaryawanComponent } from './components/master/karyawan/modal-karyawan/modal-karyawan.component';
import { ModalJadwalKerjaComponent } from './components/master/jadwal-kerja/modal-jadwal-kerja/modal-jadwal-kerja.component';
import { ModalKalenderKerjaComponent } from './components/master/kalender-kerja/modal-kalender-kerja/modal-kalender-kerja.component';
import { ModalMesinFingerComponent } from './components/master/mesin-finger/modal-mesin-finger/modal-mesin-finger.component';
import { ModalSetupMesinFingerComponent } from './components/master/setup-mesin-finger/modal-setup-mesin-finger/modal-setup-mesin-finger.component';
import { ModalStatusKehadiranComponent } from './components/status-kehadiran/modal-status-kehadiran/modal-status-kehadiran.component';
import { ModalListKehadiranComponent } from './components/list-kehadiran/modal-list-kehadiran/modal-list-kehadiran.component';
import { AbsenManualComponent } from './components/list-kehadiran/modal-list-kehadiran/absen-manual/absen-manual.component';
import { ModalLemburComponent } from './components/lembur/modal-lembur/modal-lembur.component';
import { OtoritasComponent } from './components/master/otoritas/otoritas.component';
import { ModalOtoritasComponent } from './components/master/otoritas/modal-otoritas/modal-otoritas.component';
import { ModalGantiNipComponent } from './components/ganti-nip/modal-ganti-nip/modal-ganti-nip.component';
import { DownloadDataPayrollComponent } from './components/download-data-payroll/download-data-payroll.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { LogHistoryComponent } from './components/log-history/log-history.component';
import { ModalPerpanjangKontrakComponent } from './components/master/karyawan/modal-karyawan/modal-perpanjang-kontrak/modal-perpanjang-kontrak.component';
import { ModalSetupJadwalKerjaDetailComponent } from './components/master/setup-jadwal-kerja/modal-setup-jadwal-kerja-detail/modal-setup-jadwal-kerja-detail.component';
import { ModalSetupJadwalKerjaCategoryComponent } from './components/master/setup-jadwal-kerja/modal-setup-jadwal-kerja-category/modal-setup-jadwal-kerja-category.component';
import { ModalSetupJadwalKerjaIndividuComponent } from './components/master/setup-jadwal-kerja/modal-setup-jadwal-kerja-individu/modal-setup-jadwal-kerja-individu.component';
import { VoidComponent } from './components/modals/void/void.component';
import { ModalFilterDialogComponent } from './components/list-kehadiran/modal-filter-dialog/modal-filter-dialog.component';
import { LogoutConfirmComponent } from './components/modals/logout-confirm/logout-confirm.component';
import { GantiPasswordComponent } from './components/modals/ganti-password/ganti-password.component';
import { FilterProfileDetailComponent } from './components/master/setup-jadwal-kerja/filter-profile-detail/filter-profile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BagianKerjaComponent,
    PerusahaanComponent,
    LokasiComponent,
    UserComponent,
    KaryawanComponent,
    JadwalKerjaComponent,
    SetupJadwalKerjaComponent,
    KalenderKerjaComponent,
    MesinFingerComponent,
    SetupMesinFingerComponent,
    StatusKehadiranComponent,
    ListKehadiranComponent,
    LemburComponent,
    GantiNipComponent,
    ModalBagianKerjaComponent,
    ModalPerusahaanComponent,
    ModalLokasiComponent,
    ModalUserComponent,
    ModalKaryawanComponent,
    ModalJadwalKerjaComponent,
    ModalKalenderKerjaComponent,
    ModalMesinFingerComponent,
    ModalSetupMesinFingerComponent,
    ModalStatusKehadiranComponent,
    ModalListKehadiranComponent,
    AbsenManualComponent,
    ModalLemburComponent,
    OtoritasComponent,
    ModalOtoritasComponent,
    ModalGantiNipComponent,
    DownloadDataPayrollComponent,
    DownloadReportComponent,
    LogHistoryComponent,
    ModalPerpanjangKontrakComponent,
    ModalSetupJadwalKerjaDetailComponent,
    ModalSetupJadwalKerjaCategoryComponent,
    ModalSetupJadwalKerjaIndividuComponent,
    VoidComponent,
    ModalFilterDialogComponent,
    LogoutConfirmComponent,
    GantiPasswordComponent,
    FilterProfileDetailComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // angular material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
})
export class AppModule {}
