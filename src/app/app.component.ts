import { Component } from "@angular/core";
import { PeopleService } from "./_services/people";
import { ShipsService } from "./_services/ships.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  peopleList: any;
  resultData: any;
  loading: boolean = false;
  starshipNames: string[] = [];

  constructor(private PeopleService: PeopleService, private ShipsService: ShipsService) {}

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.PeopleService.getData().subscribe((data) => {
      this.resultData = data;
      this.peopleList = data.results;
      this.fetchStarshipNames();
      console.log(this.peopleList);
    });
  }

  fetchStarshipNames() {
    this.peopleList.forEach((person: any) => {
      person.starships.forEach((starshipUrl: string) => {
        this.ShipsService.getData(starshipUrl).subscribe((data) => {
          this.starshipNames.push(data.name);
        });
      });
    });
  }

  pagination(event: any) {
    this.loading = true;
    if (event.target.name == "next") {
      this.PeopleService.getNextData(this.resultData.next).subscribe((data) => {
        this.resultData = data;
        this.peopleList = data.results;
        this.loading = false;
      });
    } else {
      if (this.resultData.previous) {
        this.PeopleService.getPreviousData(this.resultData.previous).subscribe((data) => {
          this.resultData = data;
          this.peopleList = data.results;
          this.loading = false;
        });
      }
    }
  }
}
