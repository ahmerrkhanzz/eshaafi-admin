import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { DoctorsRoutingModule } from "./admin-doctors-routing.module";
import { DoctorsTableComponent } from "./doctors-table/doctors-table.component";
import { AddDoctorComponent } from "./add-doctor/add-doctor.component";
import { AdminDoctorsComponent } from "./admin-doctors.component";
import { PersonalInformationComponent } from "./add-doctor/personal-information/personal-information.component";
import { EducationComponent } from "./add-doctor/education/education.component";
import { ExperienceComponent } from "./add-doctor/experience/experience.component";
import { AwardsComponent } from "./add-doctor/awards/awards.component";
import { ServicesComponent } from "./add-doctor/services/services.component";
import { VideoConsultationComponent } from "./add-doctor/video-consultation/video-consultation.component";
import { FaqsComponent } from "./add-doctor/faqs/faqs.component";
import { AdminDoctorsService } from "./admin-doctors.service";
import { DoctorSpecialitiesComponent } from "./doctor-specialities/doctor-specialities.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { SymptomsComponent } from './symptoms/symptoms.component';
import { HospitalComponent } from './add-doctor/hospital/hospital.component';
import { AddHospitalComponent } from './add-doctor/hospital/add-hospital/add-hospital.component';

@NgModule({
  declarations: [
    AdminDoctorsComponent,
    DoctorsTableComponent,
    AddDoctorComponent,
    PersonalInformationComponent,
    EducationComponent,
    ExperienceComponent,
    AwardsComponent,
    ServicesComponent,
    VideoConsultationComponent,
    FaqsComponent,
    DoctorSpecialitiesComponent,
    SymptomsComponent,
    HospitalComponent,
    AddHospitalComponent,
    
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DoctorsRoutingModule,
    FontAwesomeModule,
    ShowHidePasswordModule,
  ],
  exports: [DoctorsTableComponent, AddDoctorComponent, SymptomsComponent, AddHospitalComponent],
  providers: [AdminDoctorsService],
})
export class AdminDoctorsModule {}
