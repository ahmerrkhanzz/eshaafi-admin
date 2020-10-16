import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminDoctorsService } from "src/app/admin/doctors/admin-doctors.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
    if (localStorage.hasOwnProperty("token")) {
      this._router.navigate(["/admin"]);
    }
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof AdminLoginComponent
   */
  get loginFormControls(): any {
    return this.loginForm["controls"];
  }

  loginHandler() {
    this.loading = true
    let params = {
      user_type: "admin",
      user_name: this.loginForm.value.email,
      password: this.loginForm.value.password,
      device_key: "web",
      device_type: "web",
    };
    this._adminDoctorsService.signIn(params).subscribe(
      (res: any) => {
        this.loading = false
        this._toastr.success(
          "Welcome to Eshaafi Admin",
          `Hi, ${res.data.name}`
        );
        this._router.navigate(["/admin"]);
        localStorage.setItem("token", JSON.stringify(res.data.token));
      },
      (err: any) => {
        this.loading = false
        if (err && err.error) this._toastr.error(err.error.message, "Error");
      }
    );
  }
}
