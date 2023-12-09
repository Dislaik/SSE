import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { TicketService } from '../service/ticket.service';
import { TicketForm } from '../dto/ticket-form';
import { TicketCategory } from '../entity/ticket-category';
import { NotifierService } from 'angular-notifier';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit{
  private readonly notifier: NotifierService;

  page: string;
  title: string;
  allPages: string;
  
  ticketTitle: string;
  ticketCategory: number;
  ticketSubcategory: number;
  ticketDescription: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ticketService: TicketService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  
  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      this.page = "create-ticket";
      this.title = "Crear solicitud";
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/create-ticket'}
      };
      this.allPages = JSON.stringify(pages);

      this.ticketCategory = 1;
      this.ticketSubcategory = 1;
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnSubmit(): void {
    const tokenData = jwtDecode(this.tokenService.getToken())    
    let username = tokenData["username"];

    let ticketForm = new TicketForm(username, this.ticketTitle, this.ticketDescription, this.ticketCategory, this.ticketSubcategory);
    this.ticketService.create(ticketForm).subscribe(
      data => {
        this.notifier.notify('success', "La solicitud se ha creado con exito!");

        this.ticketTitle = "";
        this.ticketDescription = "";
        this.ticketCategory = 1;
        this.ticketSubcategory = 1;
      },
      err => {
        console.log(err)
        this.notifier.notify('error', err.error);
      }
    )
  }

}
