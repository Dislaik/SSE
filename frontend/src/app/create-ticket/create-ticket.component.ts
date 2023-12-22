import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { TicketService } from '../service/ticket.service';
import { TicketForm } from '../dto/ticket-form';
import { TicketCategory } from '../entity/ticket-category';
import { NotifierService } from 'angular-notifier';
import { jwtDecode } from 'jwt-decode';
import { TicketCategoryService } from '../service/ticket-category.service';
import { TicketSubcategory } from '../entity/ticket-subcategory';
import { TicketSubcategoryService } from '../service/ticket-subcategory.service';
import { LogService } from '../service/log.service';
import { CreateLog } from '../dto/create-log';

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
  ticketCategoryList: TicketCategory[];
  ticketSubcategoryList: TicketSubcategory[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private ticketService: TicketService,
    private ticketCategoryService: TicketCategoryService,
    private ticketSubcategoryService: TicketSubcategoryService,
    private logService: LogService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.activatedRoute.params.subscribe( params => {
        this.ticketCategory = params['category'];
        this.ticketSubcategory = params['subcategory']
      }
    );
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

      this.ticketCategory = this.ticketCategory ? this.ticketCategory : 1;
      this.ticketSubcategory = this.ticketSubcategory ? this.ticketSubcategory : 1;

      this.ticketCategoryService.getAll().subscribe(
        data => {
          this.ticketCategoryList = data;
        },
        err => {
          this.notifier.notify('error', err.error);
        }
      );

      this.ticketSubcategoryService.getAll().subscribe(
        data => {
          this.ticketSubcategoryList = data.filter(item => item.category.id == this.ticketCategory)
        },
        err => {
          this.notifier.notify('error', err.error);
        }
      )

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

        this.router.navigate(['/']);

        this.logService.create(new CreateLog("Se creo una solicitud", 1)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );


        /*this.ticketSubcategoryService.getAll().subscribe(
          data => {
            this.ticketSubcategoryList = data.filter(item => item.category.id == this.ticketCategory)
          },
          err => {
            this.notifier.notify('error', err.error);
          }
        )*/
      },
      err => {
        this.notifier.notify('error', err.error);
      }
    )

  }

  ngOnChange(target) {

    console.log(target.value)

    this.ticketSubcategoryService.getAll().subscribe(
      data => {

        this.ticketSubcategoryList = data.filter(item => item.category.id == target.value)
        this.ticketSubcategory = this.ticketSubcategoryList[0].id;
      },
      err => {
        this.notifier.notify('error', err.error);
      }
    )

  }

}
