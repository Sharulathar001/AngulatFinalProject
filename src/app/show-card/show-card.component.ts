import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {
  card: any;


  constructor(private route: ActivatedRoute,  private router: Router , private location: Location)  {}

  ngOnInit(): void {
    this.card = history.state.card;
  }
  // goBack(): void {
  //   this.router.navigate(['.././'], { relativeTo: this.route });
  // }

  goBack(): void {
    this.location.back();
  }

}
