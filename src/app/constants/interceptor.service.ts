import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import "rxjs/add/operator/do";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _toast: ToastrService, private _router: Router) {}
  
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessTOken = "";
    if (localStorage.hasOwnProperty("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      accessTOken = token;
    }

    return next.handle(
      httpRequest.clone({
        setHeaders: {
          Authorization: "Bearer " + accessTOken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/"]);
            localStorage.clear();
            // redirect to the login route
            // or show a modal
          }
        }
      }
    );;
  }
}
