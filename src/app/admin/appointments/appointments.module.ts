import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentsService } from "./appointments.service";

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppointmentsRoutingModule,
  ],
  exports: [AppointmentsComponent],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
