import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { AdminDoctorsService } from "../../admin-doctors.service";
import {
  textValidator,
  numericValidator,
  removeDuplicates,
} from "../../../../shared/globalfunctions";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
})
export class PersonalInformationComponent implements OnInit {
  @Input() savedForm: any;
  @Output() unauthorized = new EventEmitter<boolean>(false);
  @Output() proceed = new EventEmitter<object>(null);
  @ViewChild("avatar") avatar: ElementRef;

  public languages = [];
  public specialities: any[] = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public profileImg: File;
  public dob: any;
  public preview: string =
    "../../../../../assets/images/doctor-placeholder.jpg";
  public personalInformationForm: FormGroup;
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
  public minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  // formatter = (cities: City) => cities.name;

  constructor(
    private formBuilder: FormBuilder,
    private _adminDoctorsService: AdminDoctorsService,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) {}

  ngOnInit() {
    this.languages = [
      { id: 1, name: "English" },
      { id: 2, name: "Urdu" },
      { id: 3, name: "Turkish" },
      { id: 4, name: "German" },
      { id: 5, name: "Arabic" },
      { id: 6, name: "Spanish" },
      { id: 7, name: "Portugeese" },
    ];

    this.selectedItems = [
      { id: 3, name: "Pune" },
      { id: 4, name: "Navsari" },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };

    this.personalInformationForm = this.formBuilder.group({
      image: [null, Validators.required],
      pmdc: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
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
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
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
      date_of_birth: [""],
      country: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(40),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
      language: ["", Validators.required],
      speciality: ["", Validators.required],
      gender: ["", Validators.required],
      is_instant: [true, Validators.required],
      summary: [
        "",
        [
          Validators.required,
          Validators.minLength(20),
          Validators.pattern(/^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/),
        ],
      ],
    });

    this.getSpecialities();
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      this.patchFormValues(this.selectedDoctor);
      console.log(this.personalInformationForm);
    }

    // else if (
    //   Object.keys(this.savedForm).length !== 0 &&
    //   this.savedForm.constructor === Object
    // ) {
    //   console.log(this.savedForm);
    //   // this.patchFormValues(this.savedForm.personalInformation);
    // }
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
  get personalInformationFormControls(): any {
    return this.personalInformationForm["controls"];
  }

  /**
   *
   *  On Single Item Selection of Multi Select Dropdown
   * @param {object} item
   * @memberof PersonalInformationComponent
   */
  onItemSelect(item: any) {
    console.log(item);
  }

  /**
   *
   * On Selection of all options in multi select dropdown
   * @param {object} items array of selected items
   * @memberof PersonalInformationComponent
   */
  onSelectAll(items: any) {
    console.log(items);
  }

  /**
   * Gender Selection
   *
   * @param {object} event gender object
   * @memberof PersonalInformationComponent
   */
  changeInstant(event) {
    console.log(this.personalInformationForm);
    if (this.personalInformationForm.value.is_instant) {
      this.selectedSpecialities = [
        {
          id: null,
          name: "General Phsycian",
          file: null,
        },
      ];
      this.personalInformationForm.get("speciality").clearValidators();
      this.personalInformationForm.get("speciality").updateValueAndValidity();
    } else {
      this.selectedSpecialities = [];
      this.personalInformationForm
        .get("speciality")
        .setValidators([Validators.required]);
      this.personalInformationForm.get("speciality").updateValueAndValidity();
    }
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
        this.personalInformationForm.patchValue({
          image: reader.result,
        });
        this.personalInformationForm.get("image").updateValueAndValidity();
        this.preview = reader.result as string;
      };
    }
    event.target.value = null;
  }

  getSpecialities() {
    this._adminDoctorsService.getSpecialities().subscribe(
      (res: any) => {
        this.specialities = res.data;
      },
      (err: any) => {
        if (err && err.status === 401) {
          console.log(err);
          localStorage.removeItem("token");
          this._toast.error("Token Expired", "Error");
          this.unauthorized.emit(true);
        }
      }
    );
  }

  cancelAvatar() {
    if (localStorage.hasOwnProperty("selectedDoctor")) {
      this.preview = this.selectedDoctor.image;
      this.personalInformationForm.patchValue({
        image: "",
      });
      this.personalInformationForm.get("image").clearValidators();
      this.personalInformationForm.get("image").updateValueAndValidity();
    } else {
      this.preview = "../../../../../assets/images/doctor-placeholder.jpg";
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
        this.personalInformationForm,
        "personalInformation"
      )
    );
  }

  // trimValidation(event) {
  //   console.log(event.target.value.replace(/  /g, ' ').trim());

  //   this.personalInformationForm.patchValue({
  //     name: event.target.value.replace(/  /g, ' ').trim()
  //   })
  // }

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
      pmdc,
      name,
      email,
      password,
      phone,
      date_of_birth,
      country,
      city,
      address,
      gender,
      speciality,
      language,
      summary,
      is_instant,
    } = data;
    if (date_of_birth) {
      let date = new Date(date_of_birth);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let day = date.getDate();
      this.dob = {
        year: year,
        month: month,
        day: day,
      };
    }
    this.preview = image.includes("no-image")
      ? "../../../../../assets/images/doctor-placeholder.jpg"
      : image;
    if (!is_instant) {
      this.selectedSpecialities = speciality;
    }
    this.personalInformationForm.patchValue({
      image: "",
      pmdc: pmdc,
      name: name,
      email: email,
      phone: phone,
      password: password,
      date_of_birth:
        date_of_birth && typeof date_of_birth === "string"
          ? this.dob
          : date_of_birth,
      country: country,
      city: city,
      address: address,
      is_instant: is_instant,
      gender: gender,
      speciality: this.selectedSpecialities,
      language: removeDuplicates(language, "name"),
      summary: summary,
    });
    this.languages.forEach((e) => {
      language.forEach((element) => {
        if (e.name === element.name) {
          this.selectedLanguages.push(e);
        }
      });
    });
    this.personalInformationForm.get("password").clearValidators();
    this.personalInformationForm.get("password").updateValueAndValidity();
    this.personalInformationForm.get("image").clearValidators();
    this.personalInformationForm.get("image").updateValueAndValidity();
    console.log(this.personalInformationForm);
  }

  /**
   *
   *  Typehead Search Functions for City and Country
   * @memberof PersonalInformationComponent
   */
  // citySearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     filter((term) => term.length >= 2),
  //     map((term) =>
  //       cities
  //         .filter((city) => new RegExp(term, "mi").test(city.name))
  //         .slice(0, 10)
  //     )
  //   );

  // countrySearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     filter((term) => term.length >= 2),
  //     map((term) =>
  //       cities
  //         .filter((country) => new RegExp(term, "mi").test(country.name))
  //         .slice(0, 10)
  //     )
  //   );
}
