import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HospitalsComponent } from "./hospitals.component";
import { ViewHospitalsComponent } from "./view-hospitals/view-hospitals.component";
import { AddHospitalComponent } from "./add-hospital/add-hospital.component";

const routes: Routes = [
  {
    path: "",
    component: HospitalsComponent,
    children: [
      {
        path: "",
        component: ViewHospitalsComponent,
      },
      {
        path: "add-hospital",
        component: AddHospitalComponent,
      },
      {
        path: "edit-hospital",
        component: AddHospitalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalsRoutingModule {}
