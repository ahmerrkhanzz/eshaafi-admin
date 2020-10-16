import { Component, OnInit } from "@angular/core";
import { PatientService } from "../patient.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-view-patients",
  templateUrl: "./view-patients.component.html",
  styleUrls: ["./view-patients.component.scss"],
})
export class ViewPatientsComponent implements OnInit {
  public tableConstructor = {
    headers: [
      "Patient ID",
      "Name",
      "Contact",
      "Blood Group",
      "Gender",
      "Address",
    ],
    rows: [],
    table: "Patients",
    showActions: true,
    showCheckboxes: true,
  };
  public loading: boolean = false;
  constructor(
    private _patientsService: PatientService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  deleteEmitter(event) {
    console.log(event);
    if (event) {
      this.loading = true;
      this._patientsService.deletePatient(event.id).subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          this.tableConstructor.rows = this.tableConstructor.rows.filter(
            (e) => e.id !== event.id
          );
          this._toast.success("Patient deleted successfully", "Success");
        },
        (err: any) => {
          this.loading = false;
          console.log(err);
          if (err && err.status === 401) {
            this._router.navigate(["/"]);
            localStorage.clear();
            this._toast.error("Token Expired", "Error");
          } else {
            this._toast.error(err.error.message, "Error");
          }
        }
      );
    }
  }

  editEmitter(event) {
    console.log(event);
    localStorage.setItem("selectedPatient", JSON.stringify(event));
    this._router.navigate(["admin/patients/edit-patient"]);
  }

  getPatients() {
    this.loading = true;
    this._patientsService.getPatients().subscribe(
      (res: any) => {
        this.loading = false;
        this.tableConstructor.rows = res.data;
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
