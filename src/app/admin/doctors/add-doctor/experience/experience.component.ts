import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { AdminDoctorsService } from "../../admin-doctors.service";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import {
  textValidator,
  numericValidator,
  minDateRange,
  maxDateRange,
} from "src/app/shared/globalfunctions";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public minDateRange = minDateRange;
  public maxDateRange = maxDateRange;

  public experienceForm: FormGroup;
  public selectedDoctor: any = {};
  @Output() proceed = new EventEmitter<object>(null);
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private _adminDoctorsService: AdminDoctorsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.experienceForm = this.formBuilder.group({
      experience: this.formBuilder.array([this.initExperienceForm()]),
    });

    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      let control = <FormArray>this.experienceForm.controls["experience"];
      this.selectedDoctor.experience.forEach((element) => {
        let startDate = new Date(element.exp_start_date);
        let endDate = new Date(element.exp_end_date);
        element.exp_start_date = {
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        };
        element.exp_end_date = {
          year: endDate.getFullYear(),
          month: endDate.getMonth() + 1,
          day: endDate.getDate(),
        };
        control.push(this.updateExperienceForm(element));
      });
      control.removeAt(0);
      console.log(this.experienceForm);
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  initExperienceForm() {
    return this.formBuilder.group({
      id: [null],
      exp_hosp_name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      exp_desigination: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      exp_start_date: ["", [Validators.required]],
      exp_end_date: ["", Validators.required],
      exp_country: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });
  }

  updateExperienceForm(object) {
    return this.formBuilder.group({
      id: [object.id],
      exp_hosp_name: [
        object.exp_hosp_name,
        [Validators.required, Validators.minLength(5)],
      ],
      exp_desigination: [
        object.exp_desigination,
        [Validators.required, Validators.minLength(5)],
      ],
      exp_start_date: [object.exp_start_date, [Validators.required]],
      exp_end_date: [object.exp_end_date, Validators.required],
      exp_country: [
        object.exp_country,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof ExperienceComponent
   */
  getFormControls(index) {
    return this.experienceForm["controls"].experience["controls"][index]
      .controls;
  }

  addAnother() {
    const control = <FormArray>this.experienceForm.controls["experience"];
    control.push(this.initExperienceForm());
  }

  removeAnother() {
    const control = <FormArray>this.experienceForm.controls["experience"];
    control.removeAt(control.length - 1);
  }

  get experiences(): FormArray {
    return this.experienceForm.get("experience") as FormArray;
  }

  submit(direction) {
    this.proceed.emit(
      this._adminDoctorsService.formValidation(
        direction,
        this.experienceForm,
        "experienceForm"
      )
    );
  }
}
