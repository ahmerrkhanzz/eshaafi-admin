import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewPatientsComponent } from "./view-patients/view-patients.component";
import { PatientsComponent } from "./patients.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";

const routes: Routes = [
  {
    path: "",
    component: PatientsComponent,
    children: [
      {
        path: "",
        component: ViewPatientsComponent,
      },
      {
        path: "add-patient",
        component: AddPatientComponent,
      },
      {
        path: "edit-patient",
        component: AddPatientComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
