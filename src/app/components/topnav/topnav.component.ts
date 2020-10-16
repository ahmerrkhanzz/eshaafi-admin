import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AdminDoctorsService } from "src/app/admin/doctors/admin-doctors.service";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"],
})
export class TopnavComponent implements OnInit {
  @Input() page: string;

  public loading: boolean = false;
  public isLoggedIn: boolean = false;
  public navs: any[] = ["Consult Online", "Doctors"];
  public userInfo: any = {};

  constructor(
    private router: Router,
    private _modalService: NgbModal,
    private _adminDoctorServce: AdminDoctorsService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.hasOwnProperty("userInfo")) {
      this.isLoggedIn = true;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    } else {
      this.isLoggedIn = false;
    }
  }

  navClick(page) {
    this.router.navigate([`/${page.toLowerCase()}`]);
  }

  homePage() {
    this.router.navigate([`/`]);
  }

  openLogin() {
    // const modalRef = this._modalService.open(LoginComponent, {
    //   size: "lg",
    // });
    // modalRef.result.then((result) => {
    //   if (result) {
    //     this.isLoggedIn = true;
    //     this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //   }
    // });
    // modalRef.componentInstance.name = "World";
  }

  navigate() {
    this.router.navigate(["/admin"]);
  }

  logOut() {
    this.loading = true
    this._adminDoctorServce.logout().subscribe(
      (res: any) => {
        this.loading = false;
        localStorage.clear();
        this.toast.success("Logged out successfully", "Success");
        this.router.navigate(["/"]);
      },
      (err: any) => {
        this.loading = false;
        this.toast.error(err.error.message, "Error");
      }
    );
  }
}
