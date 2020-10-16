import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminDoctorsComponent } from "./admin-doctors.component";
import { AddDoctorComponent } from "./add-doctor/add-doctor.component";
import { DoctorsTableComponent } from "./doctors-table/doctors-table.component";
import { DoctorSpecialitiesComponent } from "./doctor-specialities/doctor-specialities.component";
import { SymptomsComponent } from "./symptoms/symptoms.component";

const routes: Routes = [
  {
    path: "",
    component: AdminDoctorsComponent,
    children: [
      {
        path: "",
        component: DoctorsTableComponent,
      },
      {
        path: "add-doctor",
        component: AddDoctorComponent,
      },
      {
        path: "edit-doctor",
        component: AddDoctorComponent,
      },
      {
        path: "specialities",
        component: DoctorSpecialitiesComponent,
      },
      {
        path: "symptoms",
        component: SymptomsComponent,
      },
      {
        path: "patients",
        component: DoctorSpecialitiesComponent,
      },
      {
        path: "add-patient",
        component: DoctorSpecialitiesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
