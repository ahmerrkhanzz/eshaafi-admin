import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseApi } from "../../constants/base.url";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  getDashboardCounts = () => {
    let url: string = "/admin/dashboard";
    return this._http.get(baseApi + url);
  };
}
