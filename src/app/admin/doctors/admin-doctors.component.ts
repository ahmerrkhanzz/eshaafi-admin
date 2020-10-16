import { Component, OnInit } from "@angular/core";
import { AdminDoctorsService } from "./admin-doctors.service";

@Component({
  selector: "app-admin-doctors",
  templateUrl: "./admin-doctors.component.html",
  styleUrls: ["./admin-doctors.component.scss"],
})
export class AdminDoctorsComponent implements OnInit {
  showAddDoctorForm: boolean = false;
  constructor(private _adminDoctorsService: AdminDoctorsService) {}

  ngOnInit(): void {
  }

  addDoctorEmitter(event) {
    this.showAddDoctorForm = event;
  }

  
}
