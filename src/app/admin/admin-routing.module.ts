import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "doctors",
        loadChildren: "./doctors/admin-doctors.module#AdminDoctorsModule",
      },
      {
        path: "patients",
        loadChildren: "./patients/patients.module#PatientsModule",
      },
      {
        path: "appointments",
        loadChildren: "./appointments/appointments.module#AppointmentsModule",
      },
      {
        path: "hospitals",
        loadChildren: "./hospitals/hospitals.module#HospitalsModule",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
