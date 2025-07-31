import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplianceComponent } from './compliance/compliance.component';
import { CaseComponent } from './case/case.component';
import { KonsultasiComponent } from './konsultasi/konsultasi.component';

const routes: Routes = [
  {
    path: 'compliance',
    component: ComplianceComponent,
  },
  {
    path: 'case',
    component: CaseComponent,
  },
  {
    path: 'konsultasi',
    component: KonsultasiComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComplianceComponent,
    CaseComponent,
    KonsultasiComponent,
  ],
})
export class ServicesModule {}
