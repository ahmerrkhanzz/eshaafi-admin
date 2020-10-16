import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { numericValidator } from 'src/app/shared/globalfunctions';
import { AdminDoctorsService } from '../../admin/doctors/admin-doctors.service';

@Component({
  selector: "app-timings",
  templateUrl: "./timings.component.html",
  styleUrls: ["./timings.component.scss"],
})
export class TimingsComponent implements OnInit {
  @Output() proceed = new EventEmitter<object>(null);
  public dob: any;
  public timingsForm: FormGroup;
  public numericValidator = numericValidator;
  public waitingTime = [
    {
      id: 1,
      value: "PIMS International",
    },
    {
      id: 2,
      value: "Syndey Hospital",
    },
    {
      id: 3,
      value: "Bee Well Hospital",
    },
    {
      id: 4,
      value: "Northern Medical Complex",
    },
    {
      id: 5,
      value: "Agha Khan University Hospital",
    },
  ];
  public selectedDoctor: any = {};
  public addedHospitals: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _adminDoctorsService: AdminDoctorsService,
  ) {}

  ngOnInit(): void {
    this.timingsForm = this.formBuilder.group({
      video_consult_id: [null],
      availability: this.formBuilder.group({
        monday: this.formBuilder.group({
          video_day: ["Mon"],
          video_day_full: ["Monday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [
            "",
            [Validators.minLength(2), Validators.maxLength(2)],
          ],
        }),
        tuesday: this.formBuilder.group({
          video_day: ["Tue"],
          video_day_full: ["Tuesday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
        wednesday: this.formBuilder.group({
          video_day: ["Wed"],
          video_day_full: ["Wednesday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
        thursday: this.formBuilder.group({
          video_day: ["Thu"],
          video_day_full: ["Thursday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
        friday: this.formBuilder.group({
          video_day: ["Fri"],
          video_day_full: ["Friday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
        saturday: this.formBuilder.group({
          video_day: ["Sat"],
          video_day_full: ["Saturday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
        sunday: this.formBuilder.group({
          video_day: ["Sun"],
          video_day_full: ["Sunday"],
          isAvailable: [false],
          video_start_time: [""],
          video_end_time: [""],
          video_duration: [""],
        }),
      }),
    });

    // if (localStorage.hasOwnProperty("selectedDoctor")) {
    //   this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
    //   // this.patchFormValues();
    //   console.log(this.timingsForm);
    // }
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof PersonalInformationComponent
   */
  get timingsFormControls(): any {
    return this.timingsForm["controls"];
  }

  /**
   * Gender Selection
   *
   * @param {object} event gender object
   * @memberof PersonalInformationComponent
   */
  changeNotificationSetting(event) {
    console.log(event);
  }

  changeAvailability(event, day) {
    const { availability } = this.timingsForm.value;
    for (const available in availability) {
      if (event && day === available) {
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_duration")
          .setValidators([Validators.required]);
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_start_time")
          .setValidators([Validators.required]);
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_end_time")
          .setValidators([Validators.required]);
      } else if (!event && day === available) {
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_duration")
          .clearValidators();
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_start_time")
          .clearValidators();
        this.timingsForm
          .get("availability")
          .get(day)
          .get("video_end_time")
          .clearValidators();
      }
      this.timingsForm
        .get("availability")
        .get(day)
        .get("video_duration")
        .updateValueAndValidity();
      this.timingsForm
        .get("availability")
        .get(day)
        .get("video_end_time")
        .updateValueAndValidity();
      this.timingsForm
        .get("availability")
        .get(day)
        .get("video_start_time")
        .updateValueAndValidity();
    }
  }

  avialabilityValidation() {
    let availabilities = [];
    const { availability } = this.timingsForm.value;
    for (const available in availability) {
      availabilities.push(availability[available]);
    }
    let isAvailabilities = availabilities.filter((e) => e.isAvailable);
    if (isAvailabilities.length) {
      console.log(isAvailabilities);
      return true;
      // return isAvailabilities.forEach((e) => {
      //   let start = moment.utc(e.video_start_time);
      //   let end = moment.utc(e.video_end_time);
      //   console.log(moment(e.video_start_time).format("LT"));
      //   console.log(moment(e.video_end_time).format("LT"));
      //   console.log(start > end);
      //   console.log(start < end);
      //   console.log(end < start);
      //   console.log(end > start);
      //   if (start > end) {
      //     this.toastr.error(
      //       "Start time should be less than End time",
      //       e.video_day_full
      //     );
      //     return false;
      //   } else if (start === end) {
      //     this.toastr.error(
      //       "Start time and End time cannot be same",
      //       e.video_day_full
      //     );
      //     return false;
      //   }
      //   return true;
      // });
    }
    return false;
  }

  patchFormValues() {
    const {
      is_hospital,
      emailNotification,
      hospital_name,
      hospital_fee,
      video_consultation_day,
      video_consult_id,
    } = this.selectedDoctor.video_consultation;
    this.timingsForm.patchValue({
      is_hospital: is_hospital,
      emailNotification: emailNotification,
      hospital_fee: hospital_fee,
      hospital_name: hospital_name,
      video_consult_id: video_consult_id,
    });
    if (video_consultation_day && video_consultation_day.length) {
      console.log(this.timingsForm.get("availability")["controls"]);

      video_consultation_day.forEach((e) => {
        let startTime = {
          hour: parseInt(e.video_start_time.split(":")[0]),
          minute: parseInt(e.video_start_time.split(":")[1]),
          second: 0,
        };
        let endTime = {
          hour: parseInt(e.video_end_time.split(":")[0]),
          minute: parseInt(e.video_end_time.split(":")[1]),
          second: 0,
        };
        e.video_start_time = startTime;
        e.video_end_time = endTime;
        switch (e.video_day) {
          case "Mon":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "monday"
            ].patchValue(e);
            break;
          case "Tue":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "tuesday"
            ].patchValue(e);
            break;
          case "Wed":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "wednesday"
            ].patchValue(e);
            break;
          case "Thu":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "thursday"
            ].patchValue(e);
            break;
          case "Fri":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "friday"
            ].patchValue(e);
            break;
          case "Sat":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "saturday"
            ].patchValue(e);
            break;
          case "Sun":
            e.isAvailable = true;
            (<FormGroup>this.timingsForm.controls["availability"]).controls[
              "sunday"
            ].patchValue(e);
            break;
          default:
            break;
        }
      });
    }
  }

  submit(direction) {
    this.avialabilityValidation();
    if (!this.avialabilityValidation())
      this.toastr.error("Please provide minimum one availability", "Error");
    else {
      this.proceed.emit(
        this._adminDoctorsService.formValidation(
          direction,
          this.timingsForm,
          "timingsForm"
        )
      );
    }
  }

  addAnotherHospital() {
    console.log(this.timingsForm);
    this.addedHospitals.push(this.timingsForm.value);
    this.timingsForm.reset();
  }

  editHospital(type, hospital) {
    if (type === "edit" && hospital) {
      const {
        is_hospital,
        emailNotification,
        hospital_fee,
        hospital_name,
        availability,
      } = hospital;
      this.timingsForm.patchValue({
        is_hospital,
        emailNotification,
        hospital_fee,
        hospital_name,
        availability,
      });
    } else if (type === "delete" && hospital) {
      this.addedHospitals = this.addedHospitals.filter(
        (e) => e.hospital_name !== hospital.hospital_name
      );
      this.timingsForm.reset();
    }
  }
}
