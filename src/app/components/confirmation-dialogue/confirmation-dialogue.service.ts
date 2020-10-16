import { Injectable } from "@angular/core";
import { ConfirmationDialogueComponent } from "./confirmation-dialogue.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class ConfirmationDialogueService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "lg" | "md" = "sm"
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogueComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
