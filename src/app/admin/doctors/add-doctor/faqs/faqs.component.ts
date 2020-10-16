import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AdminDoctorsService } from "../../admin-doctors.service";
import { textValidator } from "src/app/shared/globalfunctions";

@Component({
  selector: "app-faqs",
  templateUrl: "./faqs.component.html",
  styleUrls: ["./faqs.component.scss"],
})
export class FaqsComponent implements OnInit {
  public faq: [];

  public faqsForm: FormGroup;
  @Output() proceed = new EventEmitter<object>(null);
  public selectedDoctor: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    this.faqsForm = this.formBuilder.group({
      faqs: this.formBuilder.array([this.initFAQsForm()]),
    });
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      const control = <FormArray>this.faqsForm.controls["faqs"];
      this.selectedDoctor.faqs.forEach((element) => {
        control.push(this.updateFAQsForm(element));
      });
      control.removeAt(0);
      console.log(this.faqsForm);

      // this.faqsList.patchValue(this.selectedDoctor.faqs);
    }
  }

  initFAQsForm() {
    return this.formBuilder.group({
      faq_question: ["", Validators.required],
      faq_answer: ["", Validators.required],
    });
  }

  updateFAQsForm(obj) {
    return this.formBuilder.group({
      faq_question: [obj.faq_question, Validators.required],
      faq_answer: [obj.faq_answer, Validators.required],
    });
  }

  get faqsList(): FormArray {
    return this.faqsForm.get("faqs") as FormArray;
  }

  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof faqComponent
   */
  getFormControls(index) {
    return this.faqsForm["controls"].faqs["controls"][index].controls;
  }

  addAnother() {
    const control = <FormArray>this.faqsForm.controls["faqs"];
    control.push(this.initFAQsForm());
  }

  removeAnother() {
    const control = <FormArray>this.faqsForm.controls["faqs"];
    control.removeAt(control.length - 1);
  }

  submit(direction) {
    if (direction !== "save") {
      this.proceed.emit(
        this._adminDoctorsService.formValidation(direction, this.faqsForm, 'faqsForm')
      );
    }
  }
}
