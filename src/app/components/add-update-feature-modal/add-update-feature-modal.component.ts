import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AdminDoctorsService } from "src/app/admin/doctors/admin-doctors.service";

@Component({
  selector: "app-add-update-feature-modal",
  templateUrl: "./add-update-feature-modal.component.html",
  styleUrls: ["./add-update-feature-modal.component.scss"],
})
export class AddUpdateFeatureModalComponent implements OnInit {
  @Input() item: any;
  @Input() title: string;
  public name_en: string = "";
  public name_ur: string = "";
  public image: File;
  public icon: any = null;
  public loading: boolean = false;
  public preview: string =
    "../../../../assets/images/users/image-placeholder.png";
  constructor(
    public activeModal: NgbActiveModal,
    private _toast: ToastrService,
    private _adminDoctorsService: AdminDoctorsService
  ) {}

  ngOnInit(): void {
    console.log(this.item);
    if (this.item) {
      this.name_en = this.item.name_en;
      this.name_ur = this.item.name_ur;
      this.preview = this.item.file;
    }
  }

  close(params) {
    this.activeModal.close(params);
  }

  addSpeciality() {
    this.loading = true;
    const params = {
      name: this.name_en,
      name_en: this.name_en,
      name_ur: this.name_ur,
      user_type: "admin",
      icon: this.icon
    };
    this.close(params);
    console.log(params);
    // if (this.item) {
    //   this._adminDoctorsService
    //     .updateSpeciality(params, this.item.id)
    //     .subscribe(
    //       (res: any) => {
    //         this.loading = false;
    //         this.close(params);
    //         this._toast.success("Speciality successfully updated", "Success");
    //       },
    //       (err: any) => {
    //         this.loading = false;
    //         console.log(err);
    //         this._toast.error(err.error.message, "Error");
    //       }
    //     );
    // } else {
    //   this._adminDoctorsService.addSpeciality(params).subscribe(
    //     (res: any) => {
    //       this.loading = false;
    //       this.close(params);
    //       this._toast.success("Speciality successfully added", "Success");
    //     },
    //     (err: any) => {
    //       this.loading = false;
    //       console.log(err);
    //       this._toast.error(err.error.message, "Error");
    //     }
    //   );
    // }
  }

  /**
   *
   * Image Upload Handler
   * @param {object} event added image object info
   * @memberof AddSpecialityComponent
   */
  handleFileInput(event) {
    const reader = new FileReader();
    console.log(event.target.files);
    if (event.target.files && event.target.files.length) {
      const fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.icon = reader.result;
        this.preview = reader.result as string;
      };
    }
    event.target.value = null;
  }

  cancelAvatar() {
    this.preview = "../../../assets/images/users/image-placeholder.png";
    this.icon = null;
  }
}
