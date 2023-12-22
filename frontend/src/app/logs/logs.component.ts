import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { LogService } from '../service/log.service';
import { Log } from '../entity/log';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  page: string;
  title: string;
  allPages: string;
  role: string;
  userId: number;

  logs: Log[];
  ticketsFromAnswer: any[];

  pagination: number;
  paginationShowLogs: Log[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private log: LogService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'
    
    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken());
      this.role = tokenData['role'][0].authority;
      this.userId = tokenData["id"];
      this.pagination = 1;
      this.page = 'logs';
      this.title = 'Registros';
      
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/logs'}
      };
      this.allPages = JSON.stringify(pages);

      this.log.getAll().subscribe(
        data => {
          this.logs = data.reverse();
            console.log(this.logs)
            this.logs.forEach(element => {
              element['date'] = this.formatDate(new Date(element.createdAt));
            });

  
            this.mostrarPagina(this.logs, this.pagination, 10)
            this.paginationMax = this.obtenerPaginasTotales(this.logs, 10)
            this.paginationList = this.createRange(this.paginationMax);
        },
        err => {

        }
      );

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.mostrarPagina(this.logs, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.mostrarPagina(this.logs, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.mostrarPagina(this.logs, index, 10)
    this.pagination = index;
    console.log(index);
  }

  formatDate(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const año = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
  
    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();
    const horasFormateadas = horas < 10 ? `0${horas}` : horas.toString();
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos.toString();

    const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año} ${horasFormateadas}:${minutosFormateados}`;
  
    return fechaFormateada;
  }

  mostrarPagina(list: Log[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowLogs = list.slice(start, end);
    this.paginationLengh = this.paginationShowLogs.length;
  }

  obtenerPaginasTotales(lista: Log[], elementosPorPagina: number): number {
    return Math.ceil(lista.length / elementosPorPagina);
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
