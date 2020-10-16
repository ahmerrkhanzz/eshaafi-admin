import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseApi } from "src/app/constants/base.url";

@Injectable({
  providedIn: "root",
})
export class AppointmentsService {
  constructor(private _http: HttpClient) {}

  getAppointments = (page?) => {
    if (!page) {
      page = 1;
    }
    let url: string = `/admin/appointments?page=${page}`;
    return this._http.get(baseApi + url);
  };
}
