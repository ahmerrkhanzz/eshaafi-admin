import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-hospital",
  templateUrl: "./add-hospital.component.html",
  styleUrls: ["./add-hospital.component.scss"],
})
export class AddHospitalComponent implements OnInit {
  @ViewChild("nav") nav;
  public navs = [
    {
      title: "General Information",
      id: 1,
    },
    {
      title: "Timings",
      id: 2,
    },
    {
      title: "Services & Treatments",
      id: 3,
    },
  ];

  public selectedTab = this.navs[0];
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  selectTab(tab) {
    this.selectedTab = tab;
  }

  close(params) {
    this.activeModal.close(params);
  }

  controls = (direction, tabId, form, formName?: string) => {
    if (direction === "next") {
      this.nav.select(this.selectedTab.id + 1);
      const selectedTab = this.navs.filter((e) => e.id === tabId + 1);
      this.selectedTab = selectedTab[0];
      // this.doctorArray.push(form);
      // this.savedForm[formName] = form;
      // console.log(this.savedForm);
    } else if (direction === "back") {
      this.nav.select(this.selectedTab.id - 1);
      const selectedTab = this.navs.filter((e) => e.id === tabId - 1);
      this.selectedTab = selectedTab[0];
    } else {
      // this.doctorArray.push(form);
      // this.addDoctorProfile();
    }
  };

  validated(event) {
    console.log(event);
    if (event.direction) {
      this.controls(
        event.direction,
        this.selectedTab.id,
        event.form,
        event.name
      );
    }
  }
}
