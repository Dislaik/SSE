import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { TicketCategory } from '../entity/ticket-category';
import { TicketCategoryService } from '../service/ticket-category.service';
import { TicketSubcategoryService } from '../service/ticket-subcategory.service';
import { TicketSubcategory } from '../entity/ticket-subcategory';

@Component({
  selector: 'app-tickets-catalog',
  templateUrl: './tickets-catalog.component.html',
  styleUrls: ['./tickets-catalog.component.css']
})
export class TicketsCatalogComponent implements OnInit{
  page: string;
  title: string;
  allPages: string;

  ticketCatalogList: any[];
  ticketCategoryList: any[];
  ticketSubcategoryList: TicketSubcategory[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ticketCategoryService: TicketCategoryService,
    private ticketSubcategoryService: TicketSubcategoryService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'
    
    if (this.tokenService.getToken()) {
      this.page = 'tickets-catalog';
      this.title = 'Catálogo de solicitudes'
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/tickets-catalog'}
      };
      this.allPages = JSON.stringify(pages);

      this.ticketCategoryService.getAll().subscribe(
        data => {
          this.ticketCategoryList = data;

          this.ticketSubcategoryService.getAll().subscribe(
            data => {
              this.ticketSubcategoryList = data;

              for (const key in this.ticketCategoryList) {
                if (Object.prototype.hasOwnProperty.call(this.ticketCategoryList, key)) {
                  const element = this.ticketCategoryList[key];

                  element.subcategory = data.filter(item => item.category.id == element.id)
                }
              }
            },
            err => {
              console.log(err.error)
            }
          );
        },
        err => {
          console.log(err.error)
        }
      );

      


    } else {
      this.router.navigate(['/login']);
    }
  }

  routeWithData(category: number, subcategory: number): void {
    this.router.navigate(['/create-ticket', {category: category, subcategory: subcategory}]);
    console.log(category, subcategory)
  }

}
