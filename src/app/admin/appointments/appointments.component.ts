import { Component, OnInit } from "@angular/core";
import { AppointmentsService } from "./appointments.service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit {
  public loading: boolean = false;
  public tableConstructor = {
    headers: [
      "Appointment ID",
      "Patient Name",
      "Gender",
      "City",
      "Date & Time",
      "Contact",
      "Fee Status",
      "Doctor Name",
    ],
    rows: [],
    table: "Appointments",
    showActions: false,
    showCheckboxes: false,
    page: 1,
    total: 1,
  };

  constructor(private _appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  actionEmitter(event) {
    console.log(event);
  }

  editEmitter(event) {
    console.log(event);
  }

  pageChangeHandler(event) {
    this.getAppointments(event);
  }

  getAppointments(page?: number) {
    this.loading = true;
    this._appointmentsService.getAppointments(page).subscribe(
      (res: any) => {
        this.loading = false;
        const { data, current_page, total } = res;
        this.tableConstructor.rows = data;
        this.tableConstructor.page = current_page;
        this.tableConstructor.total = total;
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
