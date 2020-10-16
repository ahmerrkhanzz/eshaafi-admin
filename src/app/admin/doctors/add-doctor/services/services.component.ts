import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AdminDoctorsService } from "../../admin-doctors.service";
import { textValidator } from "src/app/shared/globalfunctions";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {
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

    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      let control = <FormArray>this.servicesForm.controls["service"];
      this.selectedDoctor.services.forEach((element) => {
        control.push(this.updateServicesForm(element));
      });
      // this.services.patchValue(this.selectedDoctor.services);
      control.removeAt(0);
      console.log(this.servicesForm);
    }
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
      doctor_serice_id: [null],
    });
  }

  updateServicesForm(object) {
    return this.formBuilder.group({
      id: [object.id],
      name: [object.name, Validators.required],
      doctor_serice_id: [object.doctor_serice_id],
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
    this.proceed.emit(
      this._adminDoctorsService.formValidation(
        direction,
        this.servicesForm,
        "servicesForm"
      )
    );
  }
}
