import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminDoctorsService } from "../admin-doctors.service";
import { ConfirmationDialogueService } from "src/app/components/confirmation-dialogue/confirmation-dialogue.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-doctors-table",
  templateUrl: "./doctors-table.component.html",
  styleUrls: ["./doctors-table.component.scss"],
})
export class DoctorsTableComponent implements OnInit {
  public loading: boolean = false;
  @Output() isAddDoctor = new EventEmitter<boolean>(false);
  public doctors: any[] = [];
  public searchUser: any;
  doctorss: any[] = [
    {
      name: "Burk D'Agostini",
      email: "bdagostini1v@cmu.edu",
      joining: "8/29/2017",
      city: "Islamabad",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Allergists/Immunologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/13.jpg",
    },
    {
      name: "Eileen Spencock",
      email: "espencock3x@g.co",
      joining: "1/19/2017",
      city: "Multan",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Anesthesiologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/12.jpg",
    },
    {
      name: "Cooper Vooght",
      email: "cvooght34@weebly.com",
      joining: "2/12/2017",
      city: "Karachi",
      country: "Pakistan",
      status: false,
      gender: "Female",
      speciality: "Cardiologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/1.jpg",
    },
    {
      name: "Carlene Mussared",
      email: "cmussared3z@soundcloud.com",
      joining: "1/1/2017",
      city: "Islamabad",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Colon and Rectal Surgeons",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/15.jpg",
    },
    {
      name: "Burk D'Agostini",
      email: "bdagostini1v@cmu.edu",
      joining: "8/29/2017",
      city: "Islamabad",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Allergists/Immunologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/2.jpg",
    },
    {
      name: "Eileen Spencock",
      email: "espencock3x@g.co",
      joining: "1/19/2017",
      city: "Multan",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Anesthesiologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/3.jpg",
    },
    {
      name: "Cooper Vooght",
      email: "cvooght34@weebly.com",
      joining: "2/12/2017",
      city: "Lahore",
      country: "Pakistan",
      status: false,
      gender: "Female",
      speciality: "Cardiologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/4.jpg",
    },
    {
      name: "Carlene Mussared",
      email: "cmussared3z@soundcloud.com",
      joining: "1/1/2017",
      city: "Lahore",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Colon and Rectal Surgeons",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/5.jpg",
    },
    {
      name: "Burk D'Agostini",
      email: "bdagostini1v@cmu.edu",
      joining: "8/29/2017",
      city: "Peshawar",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Allergists/Immunologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/6.jpg",
    },
    {
      name: "Eileen Spencock",
      email: "espencock3x@g.co",
      joining: "1/19/2017",
      city: "Rawalpindi",
      country: "Pakistan",
      status: true,
      gender: "Female",
      speciality: "Anesthesiologists",
      phone: "+513225866369",
      img: "../../../../assets/images/doctors/7.jpg",
    },
    // {
    //   name: "Cooper Vooght",
    //   email: 'cvooght34@weebly.com',
    //   joining: '2/12/2017',
    //   city: 'Gujrat',
    //   country: 'Pakistan',
    //   status: false,
    //   gender: 'Female',
    //   speciality: 'Cardiologists',
    //   phone: '+513225866369',
    //   img: '../../../../assets/images/doctors/9.jpg'
    // },
    // {
    //   name: "Carlene Mussared",
    //   email: 'cmussared3z@soundcloud.com',
    //   joining: '1/1/2017',
    //   city: 'Islamabad',
    //   country: 'Pakistan',
    //   status: true,
    //   gender: 'Female',
    //   speciality: 'Colon and Rectal Surgeons',
    //   phone: '+513225866369',
    //   img: '../../../../assets/images/doctors/10.jpg'
    // },
  ];
  constructor(
    private _router: Router,
    private _modalService: NgbModal,
    private _adminDoctorsService: AdminDoctorsService,
    private _confirmationDialogService: ConfirmationDialogueService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  addDoctor = () => {
    // this.isAddDoctor.emit(true);
    localStorage.removeItem("selectedDoctor");
    this._router.navigate(["admin/doctors/add-doctor"]);
  };

  editDoctor(doctor) {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    this._router.navigate(["/admin/doctors/edit-doctor"]);
  }

  viewDoctor(doctor) {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
  }

  getDoctors() {
    this.loading = true;
    this._adminDoctorsService.getDoctors().subscribe(
      (res: any) => {
        this.loading = false;
        this.doctors = res.data;
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  clickMethod(name: string) {
    if (confirm("Are you sure to delete " + name)) {
      console.log("Implement delete functionality here");
    }
  }

  openConfirmationDialog(doctor) {
    this._confirmationDialogService
      .confirm(
        "",
        `Are you sure you want to delete ${doctor.name}?`,
        "Yes",
        "Cancel",
        "md"
      )
      .then((confirmed) => {
        if (confirmed) {
          console.log("here");
          this.deleteDoctor(doctor.id);
        }
      })
      .catch((err) => console.log(err));
  }

  deleteDoctor(doctorId) {
    this.loading = true;
    this._adminDoctorsService.deleteDoctor(doctorId).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res);
        this.doctors = this.doctors.filter((e) => e.id !== doctorId);
        this._toast.success(res.message, "Success");
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
        this._toast.error(err.error.message, "Error");
      }
    );
  }
}
