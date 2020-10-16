import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { textValidator } from "src/app/shared/globalfunctions";
import { AdminDoctorsService } from "../../admin/doctors/admin-doctors.service";

@Component({
  selector: "app-services-treatments",
  templateUrl: "./services-treatments.component.html",
  styleUrls: ["./services-treatments.component.scss"],
})
export class ServicesTreatmentsComponent implements OnInit {
  public servicesForm: FormGroup;
  public textValidator = textValidator;
  public selectedDoctor: any = {};
  @Output() proceed = new EventEmitter<object>(null);

  constructor(
    private formBuilder: FormBuilder,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.servicesForm = this.formBuilder.group({
      service: this.formBuilder.array([this.initServicesForm()]),
    });
  }

  initServicesForm() {
    return this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      id: [null],
    });
  }

  get services(): FormArray {
    return this.servicesForm.get("service") as FormArray;
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof serviceComponent
   */
  getFormControls(index) {
    return this.servicesForm["controls"].service["controls"][index].controls;
  }

  addAnother() {
    const control = <FormArray>this.servicesForm.controls["service"];
    control.push(this.initServicesForm());
  }

  removeAnother() {
    const control = <FormArray>this.servicesForm.controls["service"];
    control.removeAt(control.length - 1);
  }

  submit(direction) {
    if (direction !== "save") {
      this.proceed.emit(
        this._adminDoctorsService.formValidation(
          direction,
          this.servicesForm,
          "servicesForm"
        )
      );
    }
  }
}
