import { Component, OnInit } from "@angular/core";
import { AdminDoctorsService } from "../admin-doctors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUpdateFeatureModalComponent } from "src/app/components/add-update-feature-modal/add-update-feature-modal.component";

@Component({
  selector: "app-doctor-specialities",
  templateUrl: "./doctor-specialities.component.html",
  styleUrls: ["./doctor-specialities.component.scss"],
})
export class DoctorSpecialitiesComponent implements OnInit {
  public tableConstructor = {
    headers: ["Icon", "Name"],
    rows: [],
    table: "Specialities",
    showActions: true,
    showCheckboxes: true,
    headerActions: true,
  };
  public loading: boolean = false;
  constructor(
    private _adminDoctorsService: AdminDoctorsService,
    private _toast: ToastrService,
    private _router: Router,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities() {
    this.loading = true;
    this._adminDoctorsService.getSpecialities().subscribe(
      (res: any) => {
        this.loading = false;
        this.tableConstructor.rows = [...res.data];
        this.tableConstructor.rows.forEach((e) => {
          e.name_en = e.name;
          e.name_ur = e.name;
        });
        console.log(this.tableConstructor);
      },
      (err: any) => {
        this.loading = false;
        if (err && err.status === 401) {
          console.log(err);
          this._router.navigate(["/"]);
          localStorage.clear();
          this._toast.error("Token Expired", "Error");
        }
      }
    );
  }

  addSpeciality(event?) {
    const modalRef = this._modalService.open(AddUpdateFeatureModalComponent, {
      size: "md",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loading = true;
        const params = {
          icon: result.icon,
          name: result.name_en,
        };
        if (event) {
          this._adminDoctorsService
            .updateSpeciality(params, event.id)
            .subscribe(
              (res: any) => {
                this.loading = false;
                this._toast.success(
                  "Speciality successfully updated",
                  "Success"
                );
                this.getSpecialities();
              },
              (err: any) => {
                this.loading = false;
                this._toast.error(err.error.message, "Error");
              }
            );
        } else {
          this._adminDoctorsService.addSpeciality(params).subscribe(
            (res: any) => {
              this.loading = false;
              this.getSpecialities();
              this._toast.success("Speciality successfully added", "Success");
            },
            (err: any) => {
              this.loading = false;
              console.log(err);
              this._toast.error(err.error.message, "Error");
            }
          );
        }
      }
    });
    modalRef.componentInstance.item = event ? event : null;
    modalRef.componentInstance.title = "Speciality";
  }

  actionEmitter(event) {
    console.log(event);
    if (event) {
      this.loading = true;
      this._adminDoctorsService.deleteSpeciality(event.id).subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          this.tableConstructor.rows = this.tableConstructor.rows.filter(
            (e) => e.id !== event.id
          );
          this._toast.success("Speciality deleted successfully", "Success");
        },
        (err: any) => {
          this.loading = false;
          console.log(err);
          if (err && err.status === 401) {
            console.log(err);
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

    if (event) {
      this.addSpeciality(event);
    }
  }

  addEmitter(event) {
    if (event) {
      this.addSpeciality();
    }
  }
}
