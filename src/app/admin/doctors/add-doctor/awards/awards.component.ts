import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AdminDoctorsService } from "../../admin-doctors.service";
import {
  textValidator,
  numericValidator,
} from "../../../../shared/globalfunctions";

@Component({
  selector: "app-awards",
  templateUrl: "./awards.component.html",
  styleUrls: ["./awards.component.scss"],
})
export class AwardsComponent implements OnInit {
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public dated;
  public awardsForm: FormGroup;
  public selectedDoctor: any = {};
  @Output() proceed = new EventEmitter<object>(null);

  constructor(
    private formBuilder: FormBuilder,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.awardsForm = this.formBuilder.group({
      awards: this.formBuilder.array([this.initAwardsForm()]),
    });

    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      let control = <FormArray>this.awardsForm.controls["awards"];
      // this.awardsValues.patchValue(this.selectedDoctor.awards);
      this.selectedDoctor.awards.forEach((element) => {
        control.push(this.updateAwardsForm(element));
      });
      // this.services.patchValue(this.selectedDoctor.services);
      control.removeAt(0);
      console.log(this.awardsForm);
    }
  }

  initAwardsForm() {
    return this.formBuilder.group({
      id: [null],
      award_achivements: ["", Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),],
      award_event_name: ["", Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),],
      award_desigination: ["", Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),],
      award_recive_award: ["", [Validators.required, Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/)]],
      award_recive_from: ["", Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),],
      award_recived_dated: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      award_country: ["", [Validators.minLength(5), Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/)]],
    });
  }

  updateAwardsForm(object) {
    return this.formBuilder.group({
      id: [object.id],
      award_achivements: [object.award_achivements],
      award_event_name: [object.award_event_name],
      award_desigination: [object.award_desigination],
      award_recive_award: [object.award_recive_award, Validators.required],
      award_recive_from: [object.award_recive_from],
      award_recived_dated: [
        object.award_recived_dated,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      award_country: [object.award_country, [Validators.minLength(5)]],
    });
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof awardsComponent
   */
  getFormControls(index) {
    return this.awardsForm["controls"].awards["controls"][index].controls;
  }

  addAnother() {
    const control = <FormArray>this.awardsForm.controls["awards"];
    control.push(this.initAwardsForm());
  }

  removeAnother() {
    const control = <FormArray>this.awardsForm.controls["awards"];
    control.removeAt(control.length - 1);
  }

  get awardsValues(): FormArray {
    return this.awardsForm.get("awards") as FormArray;
  }

  submit(direction) {
    this.proceed.emit(
      this._adminDoctorsService.formValidation(direction, this.awardsForm, 'awardsForm')
    );
  }
}
