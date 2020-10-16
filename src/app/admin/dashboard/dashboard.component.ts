import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public loading: boolean = false
  stats: any[] = [];
  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDashboardCounts()
  }


  /**
   *
   * GET DASHBOARD COUNTS
   * @memberof DashboardComponent
   */
  getDashboardCounts() {
    this.loading = true
    this._dashboardService.getDashboardCounts().subscribe(
      (res: any) => {
        this.loading = false
        const {
          patient_count,
          doctor_count,
          today_registered_patient,
          total_consultation,
        } = res.data;
        this.stats = [
          {
            icon: "patient",
            value: patient_count,
            title: "Registered Patients",
            class: "green",
          },
          {
            icon: "doctor-equipment",
            value: doctor_count,
            title: "Registered Doctors",
            class: "blue",
          },
          {
            icon: "doctor-list",
            value: today_registered_patient,
            title: "Patients Visited Today",
            class: "green",
          },
          {
            icon: "online-consultation",
            value: total_consultation,
            title: "Total Consultations",
            class: "blue",
          },
        ];
      },
      (err: any) => {
        this.loading = false
        this._toastr.error(err.error.message, "Error");
      }
    );
  }
}
