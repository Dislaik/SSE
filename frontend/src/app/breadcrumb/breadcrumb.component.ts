import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit{

  @Input()
  listPages: string;
  @Input()
  titlePage: string;
  breadcrumbPages: { [i: number]: { page: string; url: string } };

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbPages = JSON.parse(this.listPages);
    console.log(this.titlePage)
  }
}
