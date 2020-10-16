import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  textValidator,
  numericFloatValidator,
  numericValidator,
} from "src/app/shared/globalfunctions";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { PatientService } from "../patient.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.scss"],
})
export class AddPatientComponent implements OnInit {
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public numericFloatValidator = numericFloatValidator;
  public loading: boolean = false;

  public showSignupForm: boolean = false;
  public signUpForm: FormGroup;
  public windowRef: any;
  public user: any;
  public tempheight: any = {
    feet: "",
    inches: "",
  };
  public selectedPatient: any;
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private _patientService: PatientService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      email: [
        "",
        [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)],
      ],
      password: ["", [Validators.minLength(5)]],
      dob: [null],
      blood_group: [""],
      weight: ["", [Validators.minLength(2), Validators.maxLength(3)]],
      // height: ["", [Validators.minLength(1), Validators.maxLength(2)]],
      height: this.formBuilder.group({
        feet: [""],
        inches: [""],
      }),
      gender: [""],
      marital_status: [""],
    });

    if (localStorage.hasOwnProperty("selectedPatient")) {
      this.loading = true;
      this.selectedPatient = JSON.parse(
        localStorage.getItem("selectedPatient")
      );
      this.patchFormValues(this.selectedPatient);
    }
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof LoginComponent
   */
  get signUpFormControls(): any {
    return this.signUpForm["controls"];
  }

  /**
   * Gender Selection
   *
   * @param {object} event gender object
   * @memberof PersonalInformationComponent
   */
  changeGender(event) {
    console.log(event);
  }

  /**
   *
   * User Sign Up
   * @memberof LoginComponent
   */
  signUp() {
    this.loading = true;
    const {
      name,
      email,
      blood_group,
      dob,
      gender,
      height,
      marital_status,
      weight,
      phone,
    } = this.signUpForm.value;
    let params = {
      name,
      email,
      blood_group,
      gender,
      height,
      marital_status,
      weight,
      phone,
    };
    let dateOfBirth = moment(dob).subtract(1, "months").format();
    let formattedHeight = height.feet + " ft. " + height.inches + " in.";
    params.phone = `+92${params.phone}`;
    if (this.selectedPatient) {
      console.log(this.selectedPatient);

      this._patientService
        .updatePatient(
          {
            ...params,
            dob: dateOfBirth.split("T")[0],
            height: formattedHeight,
            device_key: "web",
            device_type: "web",
            user_type: "patient",
          },
          this.selectedPatient.id
        )
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.toast.success("Patient successfully updated", "Success");
            this._router.navigate(["admin/patients"]);
          },
          (err: any) => {
            this.loading = false;
            console.log(err);
            if (err.error.errors) {
              for (const property in err.error.errors) {
                this.toast.error(`${err.error.errors[property]}`, "Error");
              }
            }
          }
        );
    } else {
      this._patientService
        .addPatient({
          ...params,
          height: formattedHeight,
          dob: dateOfBirth.split("T")[0],
          profile_image: "",
        })
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.toast.success("Patient successfully added", "Success");
            this._router.navigate(["admin/patients"]);
          },
          (err: any) => {
            console.log(err);
            this.loading = false;
            if (err.error.errors) {
              for (const property in err.error.errors) {
                this.toast.error(`${err.error.errors[property]}`, "Error");
              }
            }
          }
        );
    }
  }

  patchFormValues(data) {
    let dobFormat = {};
    const {
      email,
      name,
      dob,
      blood_group,
      weight,
      height,
      gender,
      marital_status,
      phone,
    } = data;
    if (dob) {
      let date = new Date(dob);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let day = date.getDate();
      dobFormat = {
        year: year,
        month: month,
        day: day,
      };
    }
    if (height) {
      const splittedHeight = height.split(" ft. ");
      this.tempheight.feet = splittedHeight[0];
      this.tempheight.inches = splittedHeight[1] ? splittedHeight[1].split(" in.")[0] : null;
    }
    this.signUpForm.patchValue({
      name: name,
      email: email,
      dob: dob ? dobFormat : null,
      blood_group: blood_group,
      weight: weight,
      gender: gender.toLowerCase(),
      marital_status: marital_status.toLowerCase(),
      height: {
        feet: this.tempheight.feet,
        inches: this.tempheight.inches,
      },
      phone: phone.includes("+92") ? phone.split("+92")[1] : phone,
    });
    console.log(this.signUpForm)
    this.loading = false;
  }
}
