import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseApi } from "../../constants/base.url";

@Injectable({
  providedIn: "root",
})
export class AdminDoctorsService {
  constructor(private _http: HttpClient) {}

  public formValidation(direction, form, name?) {
    if (form.status.toLowerCase() === "invalid") {
      return {
        validated: false,
        direction: direction,
        form: form,
      };
      // return false;
    } else {
      return {
        validated: true,
        direction: direction,
        form: form.value,
        name: name,
      };
    }
  }

  getDoctors = () => {
    let url: string = "/admin/doctors";
    return this._http.get(baseApi + url);
  };

  addDoctor = (params) => {
    let url: string = "/admin/doctors/store";
    return this._http.post(baseApi + url, params);
  };

  updateDoctor = (params, id: number) => {
    let url: string = `/admin/doctors/update/${id}`;
    return this._http.post(baseApi + url, params);
  };

  deleteDoctor = (id: number) => {
    let url: string = `/admin/doctors/delete/${id}`;
    return this._http.delete(baseApi + url);
  };

  getSpecialities = () => {
    let url: string = "/admin/speciality";
    return this._http.get(baseApi + url);
  };
  addSpeciality = (params) => {
    let url: string = "/admin/speciality/store";
    return this._http.post(baseApi + url, params);
  };

  updateSpeciality = (data, id: number) => {
    let url: string = `/admin/speciality/update/${id}`;
    return this._http.post(baseApi + url, data);
  };

  deleteSpeciality = (id: number) => {
    let url: string = `/admin/speciality/delete/${id}`;
    return this._http.delete(baseApi + url);
  };

  getSymptoms = () => {
    let url: string = "/admin/symptom/get";
    return this._http.get(baseApi + url);
  };
  addSymptom = (params) => {
    let url: string = "/admin/symptom/store";
    return this._http.post(baseApi + url, params);
  };

  updateSymptom = (data, id: number) => {
    let url: string = `/admin/symptom/update/${id}`;
    return this._http.post(baseApi + url, data);
  };

  deleteSymptom = (id: number) => {
    let url: string = `/admin/symptom/delete/${id}`;
    return this._http.delete(baseApi + url);
  };

  signIn = (data) => {
    let url: string = "/login";
    return this._http.post(baseApi + url, data);
  };

  logout = () => {
    let url: string = "/logout";
    return this._http.delete(baseApi + url);
  };
}
