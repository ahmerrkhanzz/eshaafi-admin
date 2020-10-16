import { Component, OnInit } from "@angular/core";
import { AdminDoctorsService } from "../admin-doctors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUpdateFeatureModalComponent } from "src/app/components/add-update-feature-modal/add-update-feature-modal.component";

@Component({
  selector: "app-doctors-symptoms",
  templateUrl: "./symptoms.component.html",
  styleUrls: ["./symptoms.component.scss"],
})
export class SymptomsComponent implements OnInit {
  public tableConstructor = {
    headers: ["Icon", "Name"],
    rows: [],
    table: "Symptoms",
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
    this.getSymptoms();
  }

  getSymptoms() {
    this.loading = true;
    this._adminDoctorsService.getSymptoms().subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res);

        this.tableConstructor.rows = [...res.data];
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

  addSymptom(event?) {
    const modalRef = this._modalService.open(AddUpdateFeatureModalComponent, {
      size: "md",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loading = true;
        console.log(result);
        const params = {
          icon: result.icon,
          name_en: result.name_en,
          name_ur: result.name_ur,
        };
        if (event) {
          this._adminDoctorsService.updateSymptom(params, event.id).subscribe(
            (res: any) => {
              this.loading = false;
              this._toast.success("Symptom successfully updated", "Success");
              this.getSymptoms();
            },
            (err: any) => {
              this.loading = false;
              console.log(err);
              this._toast.error(err.error.message, "Error");
            }
          );
        } else {
          this._adminDoctorsService.addSymptom(params).subscribe(
            (res: any) => {
              this.loading = false;
              this._toast.success("Symptom successfully added", "Success");
              this.getSymptoms();
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
    modalRef.componentInstance.title = "Symptom";
  }

  actionEmitter(event) {
    console.log(event);
    if (event) {
      this.loading = true;
      this._adminDoctorsService.deleteSymptom(event.id).subscribe(
        (res: any) => {
          this.loading = false;
          this.tableConstructor.rows = this.tableConstructor.rows.filter(
            (e) => e.id !== event.id
          );
          this._toast.success("Symptom deleted successfully", "Success");
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

    if (event) {
      this.addSymptom(event);
    }
  }

  addEmitter(event) {
    if (event) {
      this.addSymptom();
    }
  }
}
