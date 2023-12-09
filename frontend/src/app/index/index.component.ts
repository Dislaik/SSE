import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page: string;
  title: string;
  allPages: string;
  firstName: string;
  lastName: string;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken())

      this.page = "home";
      this.title = "Inicio";
      this.firstName = tokenData["first_name"];
      this.lastName = tokenData["last_name"];

      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: this.title, url: '/home'}
      };
      this.allPages = JSON.stringify(pages);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
