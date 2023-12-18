import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  @Input()
  currentPage: string;

  firstName: string;
  lastName: string;
  userRole: string;

  constructor(
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    const tokenData = jwtDecode(this.tokenService.getToken())
    this.firstName = tokenData["first_name"];
    this.lastName = tokenData["last_name"];
    this.userRole = tokenData["role"][0].authority
  }


  ngOnLogOut(): void {
    this.tokenService.logOut();
  }
}