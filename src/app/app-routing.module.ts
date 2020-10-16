import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";

const routes: Routes = [
  {
    path: "",
    component: AdminLoginComponent,
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule",
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
