import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-frequently-questions',
  templateUrl: './frequently-questions.component.html',
  styleUrls: ['./frequently-questions.component.css']
})
export class FrequentlyQuestionsComponent implements OnInit {
  page: string;
  title: string;
  allPages: string;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'
    
    if (this.tokenService.getToken()) {
      this.page = 'frequently-questions';
      this.title = 'Preguntas frecuentes';
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/frequently-questions'}
      };
      this.allPages = JSON.stringify(pages);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
