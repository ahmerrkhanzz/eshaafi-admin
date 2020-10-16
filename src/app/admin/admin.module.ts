import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "ngx-toggle-switch";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../components/shared.module";
import { NgxNavDrawerModule } from "ngx-nav-drawer";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminAsideComponent } from "./admin-aside/admin-aside.component";
import { StatsCardComponent } from "./dashboard/stats-card/stats-card.component";
import { AdminDoctorsModule } from "./doctors/admin-doctors.module";
import { DashboardService } from "./dashboard/dashboard.service";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { HospitalsModule } from "./hospitals/hospitals.module";

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminAsideComponent,
    StatsCardComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    UiSwitchModule,
    AdminRoutingModule,
    AdminDoctorsModule,
    NgxNavDrawerModule,
    SharedModule,
    PatientsModule,
    AppointmentsModule,
    HospitalsModule,
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    AdminAsideComponent,
    StatsCardComponent,
  ],
  providers: [DashboardService],
})
export class AdminModule {}
