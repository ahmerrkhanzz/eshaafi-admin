import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseApi } from "../../constants/base.url";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private _http: HttpClient) {}

  getPatients = () => {
    let url: string = "/admin/patients";
    return this._http.get(baseApi + url);
  };

  addPatient = (data) => {
    let url: string = "/admin/add/patient";
    return this._http.post(baseApi + url, data);
  };

  updatePatient = (data, id: number) => {
    let url: string =`/admin/update/patient/${id}`;
    return this._http.post(baseApi + url, data);
  };

  deletePatient = (id: number) => {
    let url: string = `/admin/delete/patient/${id}`;
    return this._http.delete(baseApi + url);
  };
}
