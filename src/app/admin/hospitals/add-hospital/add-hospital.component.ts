import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HospitalsService } from "../hospitals.service";

@Component({
  selector: "app-add-hospital",
  templateUrl: "./add-hospital.component.html",
  styleUrls: ["./add-hospital.component.scss"],
})
export class AddHospitalComponent implements OnInit {
  @ViewChild("nav") nav;
  public loading: boolean = false;
  public navs = [
    {
      title: "General Information",
      id: 1,
    },
    {
      title: "Timings",
      id: 2,
    },
    {
      title: "Services & Treatments",
      id: 3,
    },
  ];

  public selectedTab = this.navs[0];
  public hospitalArray: any[] = [];
  public selectedHospital: any[] = [];
  constructor(
    private _hospitalsService: HospitalsService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty("selectedHospital")) {
      this.selectedHospital = JSON.parse(localStorage.getItem("selectedHospital"));
    }
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  controls = (direction, tabId, form, formName?: string) => {
    console.log({ direction, tabId, form, formName });
    if (direction === "next") {
      this.nav.select(this.selectedTab.id + 1);
      const selectedTab = this.navs.filter((e) => e.id === tabId + 1);
      this.selectedTab = selectedTab[0];
      this.hospitalArray.push(form);
      // this.savedForm[formName] = form;
    } else if (direction === "back") {
      this.nav.select(this.selectedTab.id - 1);
      const selectedTab = this.navs.filter((e) => e.id === tabId - 1);
      this.selectedTab = selectedTab[0];
    } else {
      this.hospitalArray.push(form);
      this.addHospital();
    }
  };

  validated(event) {
    console.log(event);
    if (event.direction) {
      this.controls(
        event.direction,
        this.selectedTab.id,
        event.form,
        event.name
      );
    }
  }

  createSaveObject(params?) {
    let combinedObj = this.hospitalArray.reduce(function (result, current) {
      return Object.assign(result, current);
    }, {});
    console.log(combinedObj);
    const {
      image,
      is_clinic,
      name,
      email,
      address,
      google_map,
      phone,
      service,
      summary,
      availability,
      beds,
    } = combinedObj;
    const saveObject = {
      profile_image: image,
      name: name,
      email: email,
      phone: `+92${phone}`,
      address: address,
      about: summary,
      map_link: google_map,
      beds: beds,
      services: service,
      is_clinic: is_clinic,
      availability: {
        video_consultation_day: this.videoConsultationDaysFormatter(
          availability
        ),
      },
    };
    return saveObject;
  }

  arrayFormatter(array, type) {
    if (type === "id") {
      return array.map((obj) => {
        return obj.id;
      });
    } else if (type === "name") {
      return array.map((obj) => {
        return obj.name;
      });
    } else {
      return array.map((obj) => {
        return obj.service;
      });
    }
  }

  videoConsultationDaysFormatter(availability) {
    let selectedDays = [];
    for (const day in availability) {
      if (availability[day].isAvailable) {
        selectedDays.push({
          video_day: availability[day].video_day,
          video_duration: availability[day].video_duration,
          video_end_time: availability[day].video_end_time,
          video_start_time: availability[day].video_start_time,
        });
      }
    }
    return selectedDays;
  }

  async addHospital() {
    const saveObject = await this.createSaveObject();
    console.log(saveObject);
    this.loading = true;
    if (localStorage.hasOwnProperty("selectedHospital")) {
      const selectedHospital = JSON.parse(localStorage.getItem("selectedHospital"));
      this._hospitalsService
        .updateHospital(saveObject, selectedHospital.id)
        .subscribe(
          (res) => {
            this.loading = false;
            if (res) {
              this._toast.success(
                "Doctor updated successfully",
                "Congratulations"
              );
              this._router.navigate(["/admin/hospitals"]);
            }
          },
          (err) => {
            this.loading = false;
            if (err.error.errors) {
              for (const property in err.error.errors) {
                this._toast.error(`${err.error.errors[property]}`, "Error");
              }
            }
          }
        );
    } else {
      this._hospitalsService.addHospital(saveObject).subscribe(
        (res) => {
          this.loading = false;
          if (res) {
            this._toast.success("Hospital added successfully", "Congratulations");
            this._router.navigate(["/admin/hospitals"]);
          }
        },
        (err) => {
          this.loading = false;
          if (err.error.errors) {
            for (const property in err.error.errors) {
              this._toast.error(`${err.error.errors[property]}`, "Error");
            }
          }
        }
      );
    }
  }

  isUserLoggedIn(event) {
    if (event) {
      this._router.navigate(["/"]);
    }
  }
}
