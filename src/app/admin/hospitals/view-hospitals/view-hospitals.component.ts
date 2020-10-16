import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PatientService } from "../../patients/patient.service";
import { HospitalsService } from "../hospitals.service";

@Component({
  selector: "app-view-hospitals",
  templateUrl: "./view-hospitals.component.html",
  styleUrls: ["./view-hospitals.component.scss"],
})
export class ViewHospitalsComponent implements OnInit {
  public tableConstructor = {
    headers: ["Name", "Phone", "Address"],
    rows: [
      // {
      //   image:
      //     "https://lh3.googleusercontent.com/3H8WXCeZflRYtKmOQiX2TLScieKZyBruh2ZrGwI9LYy2Y1T6ohx9bcuLobmX6PVzIt1_",
      //   name: "Agha Khan University Hospital",
      //   email: "shifa@hospital.com",
      //   phone: "021-111911911",
      //   address:
      //     "National Stadium Rd, Aga Khan University Hospital, Karachi, Karachi City, Sindh 74800",
      // },
      // {
      //   image: "https://www.shifa.com.pk/wp-content/uploads/2020/09/logo.jpg",
      //   name: "Shifa International Hospital",
      //   email: "shifa@hospital.com",
      //   phone: "051-8464646",
      //   address:
      //     "4 Pitras Bukhari Rd, H-8/4 H 8/4 H-8, Islamabad, Islamabad Capital Territory",
      // },
    ],
    table: "Hospitals & Clinics",
    showActions: true,
    showCheckboxes: true,
  };
  public loading: boolean = false;
  constructor(
    private _hospitalsService: HospitalsService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getHospitals();
  }

  deleteEmitter(event) {
    console.log(event);
    if (event) {
      this.loading = true;
      this._hospitalsService.deletePatient(event.id).subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          // this.tableConstructor.rows = this.tableConstructor.rows.filter(
          //   (e) => e.id !== event.id
          // );
          this._toast.success("Hospital deleted successfully", "Success");
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
    localStorage.setItem("selectedHospital", JSON.stringify(event));
    this._router.navigate(["admin/hospitals/edit-hospital"]);
  }

  getHospitals() {
    this.loading = true;
    this._hospitalsService.getHospitals().subscribe(
      (res: any) => {
        console.log(res);
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
