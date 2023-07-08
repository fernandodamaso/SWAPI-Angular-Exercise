import { Component } from "@angular/core";
import { PersonagensService } from "./services/personagens.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  peopleList: any;
  resultData: any;
  loading: boolean = false;

  constructor(private PersonagensService: PersonagensService) {}

  ngOnInit(): void {
    this.buscarPersonagens();
  }

  buscarPersonagens() {
    this.PersonagensService.getData().subscribe((data) => {
      console.log(data);
      this.resultData = data;
      this.peopleList = data.results;
      console.log(this.peopleList);
    });
  }

  pagination(event: any) {
    this.loading = true;
    if (event.target.name == "next") {
      this.PersonagensService.getNextData(this.resultData.next).subscribe((data) => {
        this.resultData = data;
        this.peopleList = data.results;
        this.loading = false;
      });
    } else {
      if (this.resultData.previous) {
        this.PersonagensService.getPreviousData(this.resultData.previous).subscribe((data) => {
          this.resultData = data;
          this.peopleList = data.results;
          this.loading = false;
        });
      }
    }
  }
}
