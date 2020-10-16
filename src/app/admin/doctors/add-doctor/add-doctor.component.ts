import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { AddDoctor } from "src/app/interfaces/addDoctor";
import { AdminDoctorsService } from "../admin-doctors.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.scss"],
})
export class AddDoctorComponent implements OnInit, OnDestroy {
  public savedForm: object = {};
  public loading: boolean = false;
  @ViewChild("nav") nav;
  public doctors: any[] = [
    {
      title: "Personal Information",
      id: 1,
    },
    {
      title: "Education",
      id: 2,
    },
    {
      title: "Experience",
      id: 3,
    },
    {
      title: "Awards",
      id: 4,
    },
    // {
    //   title: "Hospital",
    //   id: 5,
    // },
    {
      title: "Video Consultation",
      id: 5,
    },
    {
      title: "Services",
      id: 6,
    },
    {
      title: "FAQs",
      id: 7,
    },
  ];
  public selectedTab = this.doctors[0];
  public saveDoctorObject: any = {};
  public doctorArray: any[] = [];
  public selectedDoctor: any[] = [];

  constructor(
    private _adminDoctorsService: AdminDoctorsService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
    }
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  controls = (direction, tabId, form, formName?: string) => {
    if (direction === "next") {
      this.nav.select(this.selectedTab.id + 1);
      const selectedTab = this.doctors.filter((e) => e.id === tabId + 1);
      this.selectedTab = selectedTab[0];
      this.doctorArray.push(form);
      this.savedForm[formName] = form;
      console.log(this.savedForm);
    } else if (direction === "back") {
      this.nav.select(this.selectedTab.id - 1);
      const selectedTab = this.doctors.filter((e) => e.id === tabId - 1);
      this.selectedTab = selectedTab[0];
    } else {
      this.doctorArray.push(form);
      this.addDoctorProfile();
    }
  };

  onNavChange(changeEvent: NgbNavChangeEvent) {
    // if (changeEvent.nextId === 3) {
    //   changeEvent.preventDefault();
    // }
  }

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
    let combinedObj = this.doctorArray.reduce(function (result, current) {
      return Object.assign(result, current);
    }, {});
    console.log(combinedObj);
    const {
      image,
      name,
      email,
      password,
      phone,
      city,
      country,
      address,
      pmdc,
      summary,
      language,
      speciality,
      gender,
      date_of_birth,
      education,
      experience,
      awards,
      service,
      video_consultation_fee,
      v_c_waiting_time,
      is_online,
      emailNotification,
      faqs,
      availability,
      video_consult_id,
      is_instant,
    } = combinedObj;
    const saveObject = {
      profile_image: image,
      name: name,
      email: email,
      password: password,
      phone: phone,
      city: city,
      country: country,
      address: address,
      pmdc: pmdc,
      summary: summary,
      is_instant: is_instant,

      language: this.arrayFormatter(language, "name"),
      speciality: is_instant ? null : speciality,
      gender: gender,
      date_of_birth: date_of_birth,
      education: education,
      experience: experience,
      award: awards,
      services: service,
      video_consultation: {
        video_consultation_fee: video_consultation_fee,
        v_c_waiting_time: v_c_waiting_time,
        is_online: is_online,
        video_consult_id: video_consult_id,
        emailNotification: emailNotification,
        video_consultation_day: this.videoConsultationDaysFormatter(
          availability
        ),
      },
      faqs: faqs,
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

  async addDoctorProfile() {
    const saveObject = await this.createSaveObject();
    console.log(saveObject);
    this.loading = true;
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      const selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      this._adminDoctorsService
        .updateDoctor(saveObject, selectedDoctor.id)
        .subscribe(
          (res) => {
            this.loading = false;
            if (res) {
              this._toast.success(
                "Doctor updated successfully",
                "Congratulations"
              );
              this._router.navigate(["/admin/doctors"]);
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
      this._adminDoctorsService.addDoctor(saveObject).subscribe(
        (res) => {
          this.loading = false;
          if (res) {
            this._toast.success("Doctor added successfully", "Congratulations");
            this._router.navigate(["/admin/doctors"]);
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

  ngOnDestroy() {
    this.savedForm = null;
  }
}
