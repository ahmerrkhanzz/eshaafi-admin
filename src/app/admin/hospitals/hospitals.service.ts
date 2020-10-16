import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseApi } from "src/app/constants/base.url";

@Injectable({
  providedIn: "root",
})
export class HospitalsService {
  constructor(private _http: HttpClient) {}

  getHospitals = () => {
    let url: string = "/admin/hospital";
    return this._http.get(baseApi + url);
  };

  addHospital = (data) => {
    let url: string = "/admin/hospital/store";
    return this._http.post(baseApi + url, data);
  };

  updateHospital = (data, id: number) => {
    let url: string = `/admin/update/patient/${id}`;
    return this._http.post(baseApi + url, data);
  };

  deletePatient = (id: number) => {
    let url: string = `/admin/delete/patient/${id}`;
    return this._http.delete(baseApi + url);
  };
}
