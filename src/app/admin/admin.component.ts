import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  public show:boolean = false
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (!localStorage.hasOwnProperty("token")) {
      this._router.navigate(["/"]);
    }
  }
}
