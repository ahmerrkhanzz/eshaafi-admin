import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ConfirmationDialogueService } from "../confirmation-dialogue/confirmation-dialogue.service";

@Component({
  selector: "app-custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"],
})
export class CustomTableComponent implements OnInit {
  @Input() tableConstructor: any;
  @Output() actionEmitter = new EventEmitter<any>(null);
  @Output() editEmitter = new EventEmitter<any>(null);
  @Output() addEmitter = new EventEmitter<string>(null);
  @Output() pageChange? = new EventEmitter<number>(null);
  @Input() headerActions?: boolean;
  public searchUser: any;
  public loading: boolean = false;
  // @Output() isAddDoctor = new EventEmitter<boolean>(false);
  public doctors: any[] = [];
  constructor(
    private _confirmationDialogService: ConfirmationDialogueService
  ) {}

  ngOnInit(): void {
    console.log(this.tableConstructor);
  }

  openConfirmationDialog(item) {
    this._confirmationDialogService
      .confirm(
        "",
        `Are you sure you want to delete ${item.name_en}?`,
        "Yes",
        "Cancel",
        "md"
      )
      .then((confirmed) => {
        if (confirmed) {
          this.actionEmitter.emit(item);
        }
      })
      .catch((err) => console.log(err));
  }

  editHandler(item) {
    this.editEmitter.emit(item);
  }

  addHandler() {
    this.addEmitter.emit(this.tableConstructor.table);
  }

  pageChangeHandler(event) {
    this.pageChange.emit(event);
  }
}
