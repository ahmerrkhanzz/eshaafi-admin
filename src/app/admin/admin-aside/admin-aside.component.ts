import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgbAccordion } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-admin-aside",
  templateUrl: "./admin-aside.component.html",
  styleUrls: ["./admin-aside.component.scss"],
})
export class AdminAsideComponent implements OnInit {
  @ViewChild("acc") acc: NgbAccordion;
  public isCollapsed = true;
  activeIds: string[] = [];
  public navList = [
    {
      id: "1",
      name: "Dashboard",
      icon: "fab fa-buffer",
      img: "dashboard_blue",
      child: null,
    },
    {
      id: "2",
      name: "Doctors",
      icon: "fas fa-stethoscope",
      img: "doctor_blue",
      child: [
        {
          route: "doctors",
          name: "View Doctors",
          icon: "fas fa-stethoscope",
        },
        {
          route: "doctors/add-doctor",
          name: "Add Doctor",
          icon: "fas fa-stethoscope",
        },
        {
          route: "doctors/specialities",
          name: "Doctor's Speciality",
          icon: "fas fa-stethoscope",
        },
        {
          route: "doctors/symptoms",
          name: "Symptoms",
          icon: "fas fa-stethoscope",
        },
      ],
    },
    {
      id: "3",
      name: "Patients",
      icon: "fas fa-stethoscope",
      img: "patient_blue",
      child: [
        {
          route: "patients",
          name: "View Patients",
          icon: "fas fa-stethoscope",
        },
        {
          route: "patients/add-patient",
          name: "Add Patient",
          icon: "fas fa-stethoscope",
        },
      ],
    },
    {
      id: 4,
      name: "Appointments",
      icon: "fab fa-buffer",
      img: "calendar_blue",
      child: null,
    },
    // {
    //   id: 5,
    //   name: "Hospitals & Clinics",
    //   icon: "fab fa-buffer",
    //   img: "calendar_blue",
    //   child: [
    //     {
    //       route: "hospitals",
    //       name: "View Hospitals",
    //       icon: "fas fa-stethoscope",
    //     },
    //     {
    //       route: "hospitals/add-hospital",
    //       name: "Add Hospital",
    //       icon: "fas fa-stethoscope",
    //     },
    //   ],
    // },
    // {
    //   name: "Patients",
    //   icon: "fas fa-hospital-user",
    // },
    // {
    //   name: "Appointments",
    //   icon: "far fa-calendar-check",
    // },
    // {
    //   name: "Lab Records",
    //   icon: "fas fa-file-medical-alt",
    // },
    // {
    //   name: "Messages",
    //   icon: "far fa-comment-alt",
    // },
    // {
    //   name: "Preferences",
    //   icon: "fas fa-asterisk",
    // },
    // {
    //   name: "Logout",
    //   icon: "fas fa-sign-out-alt",
    // },
  ];
  public selectedItem: any = {};
  public selectedChild: any = {};
  constructor(private _router: Router) {
    this._router.events.subscribe((val: NavigationEnd) => {
      if (val.hasOwnProperty("url")) {
        if (val.url === "/admin/dashboard") {
          this.selectedItem = this.navList[0];
          this.activeIds[0] = "panel-0";
        } else if (val.url === "/admin/doctors") {
          this.activeIds[0] = "panel-1";
          this.selectedItem = this.navList[1];
          this.selectedChild = this.navList[1].child[0];
        } else if (val.url === "/admin/doctors/add-doctor") {
          this.activeIds[0] = "panel-1";
          this.selectedItem = this.navList[1];
          this.selectedChild = this.navList[1].child[1];
        } else if (val.url === "/admin/doctors/specialities") {
          this.activeIds[0] = "panel-1";
          this.selectedItem = this.navList[1];
          this.selectedChild = this.navList[1].child[2];
        } else if (val.url === "/admin/doctors/symptoms") {
          this.activeIds[0] = "panel-1";
          this.selectedItem = this.navList[1];
          this.selectedChild = this.navList[1].child[3];
        } else if (val.url === "/admin/patients") {
          this.activeIds[0] = "panel-2";
          this.selectedItem = this.navList[2];
          this.selectedChild = this.navList[2].child[0];
        } else if (val.url === "/admin/patients/add-patient") {
          this.activeIds[0] = "panel-2";
          this.selectedItem = this.navList[1];
          this.selectedChild = this.navList[2].child[1];
        } else if (val.url === "/admin/appointments") {
          this.activeIds[0] = "panel-3";
          this.selectedItem = this.navList[3];
        }
      }
    });
  }

  ngOnInit(): void {}

  tabClick(comp) {
    console.log(comp);
    this.selectedItem = comp;
    // this.activeIds[0] = comp.id
    if (comp.child) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.isCollapsed = true;
      this._router.navigate([`admin/${comp.name.toLowerCase()}`]);
    }
  }

  tabChildClick(childComp) {
    this.selectedChild = childComp;
    localStorage.removeItem("selectedDoctor");
    localStorage.removeItem("selectedPatient");
    this._router.navigate([`admin/${childComp.route.toLowerCase()}`]);
  }
}
