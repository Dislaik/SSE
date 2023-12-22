import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { User } from '../entity/user';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../service/user.service';
import { Role } from '../entity/role';
import { RoleService } from '../service/role.service';
import { RegisterUser } from '../dto/register-user';
import { NotifierService } from 'angular-notifier';
import { UpdateUser } from '../dto/update-user';
import { CreateLog } from '../dto/create-log';
import { LogService } from '../service/log.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  private readonly notifier: NotifierService;
  page: string;
  title: string;
  allPages: string;
  role: string;
  userId: number;
  userTargetId: number;

  users: User[];
  roleList: Role[];

  pagination: number;
  paginationShowUsers: User[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];


  inputUsername: string;
  inputPassword: string;
  inputEmail: string;
  inputFirstName: string;
  inputLastName: string;
  inputRole: number;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private roleService: RoleService,
    private logService: LogService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'
    
    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken());
      this.role = tokenData['role'][0].authority;
      this.userId = tokenData["id"];
      this.pagination = 1;
      this.page = 'users';
      this.title = 'Usuarios';


      this.inputUsername = "";
      this.inputPassword = "";
      this.inputEmail = "";
      this.inputFirstName = "";
      this.inputLastName = "";
      this.inputRole = 1;



      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/users'}
      };
      this.allPages = JSON.stringify(pages);

      this.userService.getAll().subscribe(
        data => {
          this.users = data.reverse();
          console.log(this.users);
            
            /*this.users.forEach(element => {
              element['date'] = this.formatDate(new Date(element.createdAt));
            });*/
  
            this.mostrarPagina(this.users, this.pagination, 10)
            this.paginationMax = this.obtenerPaginasTotales(this.users, 10)
            this.paginationList = this.createRange(this.paginationMax);
        },
        err => {

        }
      );

      this.roleService.getAll().subscribe(
        data => {
          this.roleList = data;
          this.roleList[0].role = "Estudiante"
          this.roleList[1].role = "Personal Administrativo"
          this.roleList[2].role = "Administrador"
        },
        err => {
          console.log(err.error);
        }
      );

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnTicketDetails(ticket): void {
    console.log(ticket.value.id);
    this.router.navigate(['/ticket', ticket.value.id]);
  }

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.mostrarPagina(this.users, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.mostrarPagina(this.users, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.mostrarPagina(this.users, index, 10)
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

  mostrarPagina(list: User[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowUsers = list.slice(start, end);
    this.paginationLengh = this.paginationShowUsers.length;
  }

  obtenerPaginasTotales(lista: User[], elementosPorPagina: number): number {
    return Math.ceil(lista.length / elementosPorPagina);
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  ngOnClearUserInput(): void {
    this.inputUsername = "";
    this.inputPassword = "";
    this.inputEmail = "";
    this.inputFirstName = "";
    this.inputLastName = "";
    this.inputRole = 1;
  }

  ngOnUserCreate(): void {
    const registerUser = new RegisterUser(this.inputUsername, this.inputPassword, this.inputEmail, this.inputFirstName, this.inputLastName, this.inputRole);
    this.userService.create(registerUser).subscribe(
      data => {
        this.notifier.notify('success', "El usuario se ha creado con exito!");

        this.inputUsername = "";
        this.inputPassword = "";
        this.inputEmail = "";
        this.inputFirstName = "";
        this.inputLastName = "";
        this.inputRole = 1;

        this.userService.getAll().subscribe(
          data => {
            this.users = data.reverse();
            console.log(this.users);
              
              /*this.users.forEach(element => {
                element['date'] = this.formatDate(new Date(element.createdAt));
              });*/
    
              this.mostrarPagina(this.users, this.pagination, 10)
              this.paginationMax = this.obtenerPaginasTotales(this.users, 10)
              this.paginationList = this.createRange(this.paginationMax);
          },
          err => {
  
          }
        );


        this.logService.create(new CreateLog("El usuario " + registerUser.username + " fue creado", 1)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error);
      }
    );
  }

  ngOnUserUpdate(): void {
    const updateUser = new UpdateUser(this.inputUsername, this.inputPassword, this.inputEmail, this.inputFirstName, this.inputLastName, this.inputRole);

    this.userService.update(this.userTargetId, updateUser).subscribe(
      data => {
        this.notifier.notify('success', "El usuario se ha eliminado con exito!");

        this.inputUsername = "";
        this.inputPassword = "";
        this.inputEmail = "";
        this.inputFirstName = "";
        this.inputLastName = "";
        this.inputRole = 1;

        this.userService.getAll().subscribe(
          data => {
            this.users = data.reverse();
            console.log(this.users);
              
              /*this.users.forEach(element => {
                element['date'] = this.formatDate(new Date(element.createdAt));
              });*/
    
              this.mostrarPagina(this.users, this.pagination, 10)
              this.paginationMax = this.obtenerPaginasTotales(this.users, 10)
              this.paginationList = this.createRange(this.paginationMax);
          },
          err => {
  
          }
        );


        this.logService.create(new CreateLog("El usuario " + updateUser.username + " fue actualizado", 2)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {

      }
    );
    
  }

  ngOnUserDelete(user): void {
    const id = user.value.id;

    this.userService.delete(id).subscribe(
      data => {
        this.notifier.notify('success', "El usuario se ha eliminado con exito!");
        
        this.userService.getAll().subscribe(
          data => {
            this.users = data.reverse();
            console.log(this.users);
              
              /*this.users.forEach(element => {
                element['date'] = this.formatDate(new Date(element.createdAt));
              });*/
    
              this.mostrarPagina(this.users, this.pagination, 10)
              this.paginationMax = this.obtenerPaginasTotales(this.users, 10)
              this.paginationList = this.createRange(this.paginationMax);
          },
          err => {
  
          }
        );

        this.logService.create(new CreateLog("El usuario " + user.value['username'] + " fue eliminado", 3)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error);
      }
    );

  }

  ngOnGetUserId(user): void {
    this.userTargetId = user.value.id;
    console.log(this.userTargetId)
  }
}
