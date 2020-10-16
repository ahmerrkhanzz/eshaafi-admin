import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { AdminDoctorsService } from "../../admin-doctors.service";
import {
  textValidator,
  numericValidator,
  minDateRange,
  maxDateRange,
} from "../../../../shared/globalfunctions";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit, AfterViewInit {
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public minDateRange = minDateRange;
  public maxDateRange = maxDateRange;

  startDate: any;
  public educationForm: FormGroup;
  public selectedDoctor: any = {};
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  @Output() proceed = new EventEmitter<object>(null);

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.educationForm = this.formBuilder.group({
      education: this.formBuilder.array([this.initEducationForm()]),
    });

    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      let control = <FormArray>this.educationForm.controls["education"];
      this.selectedDoctor.education.forEach((element) => {
        let startDate = new Date(element.edu_start_date);
        let endDate = new Date(element.edu_end_date);
        element.edu_start_date = {
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        };
        element.edu_end_date = {
          year: endDate.getFullYear(),
          month: endDate.getMonth() + 1,
          day: endDate.getDate(),
        };
        control.push(this.updateExperienceForm(element));
      });
      // this.educations.patchValue(this.selectedDoctor.education);
      control.removeAt(0);
      console.log(this.educationForm);
    }
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  initEducationForm() {
    return this.formBuilder.group({
      id: [null],
      degree: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      institute: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      edu_start_date: ["", [Validators.required]],
      edu_end_date: ["", Validators.required],
      edu_country: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });
  }

  /**
   * Updating the form array
   *
   * @param {data} object
   * @returns formgroup
   * @memberof EducationComponent
   */
  updateExperienceForm(object) {
    return this.formBuilder.group({
      id: [object.id],
      degree: [object.degree, Validators.required],
      institute: [
        object.institute,
        [Validators.required, Validators.minLength(5)],
      ],
      edu_start_date: [object.edu_start_date, Validators.required],
      edu_end_date: [object.edu_end_date, Validators.required],
      edu_country: [
        object.edu_country,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  addAnother() {
    const control = <FormArray>this.educationForm.controls["education"];
    control.push(this.initEducationForm());
  }

  removeAnother() {
    const control = <FormArray>this.educationForm.controls["education"];
    control.removeAt(control.length - 1);
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof EducationComponent
   */
  getFormControls(index) {
    return this.educationForm["controls"].education["controls"][index].controls;
  }

  get educations(): FormArray {
    return this.educationForm.get("education") as FormArray;
  }

  submit(direction) {
    this.proceed.emit(
      this._adminDoctorsService.formValidation(
        direction,
        this.educationForm,
        "educationForm"
      )
    );
  }
}
