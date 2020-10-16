import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AdminDoctorsService } from 'src/app/admin/doctors/admin-doctors.service';
import {
  textValidator,
  numericValidator,
} from "src/app/shared/globalfunctions";

@Component({
  selector: "app-general-information",
  templateUrl: "./general-information.component.html",
  styleUrls: ["./general-information.component.scss"],
})
export class GeneralInformationComponent implements OnInit {
  @Output() proceed = new EventEmitter<object>(null);
  public languages = [];
  public specialities: any[] = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public profileImg: File;
  public dob: any;
  public preview: string =
    "../../../assets/images/hospital_placeholder.png";
  public generalInformationForm: FormGroup;
  public textValidator = textValidator;
  public numericValidator = numericValidator;
  public selectedDoctor: any = {};
  public selectedLanguages: any[] = [];
  public selectedSpecialities: any[] = [
    {
      id: null,
      name: "General Phsycian",
      file: null,
    },
  ];
  unauthorized: any;

  // formatter = (cities: City) => cities.name;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit() {
    this.generalInformationForm = this.formBuilder.group({
      image: [null, Validators.required],
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      google_map: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      beds: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(70),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      is_clinic: ["", Validators.required],
      summary: [
        "",
        [
          Validators.required,
          Validators.minLength(20),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });

    if (localStorage.hasOwnProperty("selectedHospital")) {
      const selectedHospital = JSON.parse(localStorage.getItem("selectedHospital"));
      this.patchFormValues(selectedHospital);
      console.log(this.generalInformationForm);
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  /**
   *
   * Getter method for form controls values
   * @readonly
   * @type {object}
   * @memberof PersonalInformationComponent
   */
  get generalInformationFormControls(): any {
    return this.generalInformationForm["controls"];
  }

  /**
   *
   * Image Upload Handler
   * @param {object} event added image object info
   * @memberof PersonalInformationComponent
   */
  handleFileInput(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.generalInformationForm.patchValue({
          image: reader.result,
        });
        this.generalInformationForm.get("image").updateValueAndValidity();
        this.preview = reader.result as string;
      };
    }
    event.target.value = null;
  }

  cancelAvatar() {
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.preview = this.selectedDoctor.image;
      this.generalInformationForm.patchValue({
        image: "",
      });
      this.generalInformationForm.get("image").clearValidators();
      this.generalInformationForm.get("image").updateValueAndValidity();
    } else {
      this.preview = "../../../../../assets/images/hospital_placeholder.png";
    }
  }

  /**
   *
   *  Submit Personal Information Form
   * @param {string} direction direction for the wizard form (back/next)
   * @memberof PersonalInformationComponent
   */
  submit(direction) {
    this.proceed.emit(
      this._adminDoctorsService.formValidation(
        direction,
        this.generalInformationForm,
        "generalInformation"
      )
    );
  }

  setInputFilter(
    textbox: Element,
    inputFilter: (value: string) => boolean
  ): void {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      textbox.addEventListener(event, function (
        this: (HTMLInputElement | HTMLTextAreaElement) & {
          oldValue: string;
          oldSelectionStart: number | null;
          oldSelectionEnd: number | null;
        }
      ) {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (Object.prototype.hasOwnProperty.call(this, "oldValue")) {
          this.value = this.oldValue;
          if (
            this.oldSelectionStart !== null &&
            this.oldSelectionEnd !== null
          ) {
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          }
        } else {
          this.value = "";
        }
      });
    });
  }

  patchFormValues(data) {
    const {
      image,
      name,
      email,
      phone,
      address,
      summary,
    } = data;
    this.generalInformationForm.patchValue({
      image: "",
      name: name,
      email: email,
      phone: phone,
      address: address,
      summary: summary,
    });
    this.generalInformationForm.get("image").clearValidators();
    this.generalInformationForm.get("image").updateValueAndValidity();
    console.log(this.generalInformationForm);
  }
}
