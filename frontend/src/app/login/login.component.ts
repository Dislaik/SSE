import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { NotifierService } from 'angular-notifier';
import { LoginUser } from '../dto/login-user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly notifier: NotifierService;
  //isLogged = false;
  loginUser: LoginUser;
  username: string;
  password: string;
  roles: string[] = [];
  showError = false;
  textError: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private notifierService: NotifierService,
    private authService: AuthService
  ) {
    this.notifier = notifierService;
  }
  
  ngOnInit(): void {
    document.body.style.marginLeft = '0px'

    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogin(): void {
    console.log(this.username)
    console.log(this.password)
    this.loginUser = new LoginUser(this.username, this.password)
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.notifier.notify('success', 'Has ingresado exitosamente!');
        this.router.navigate(['/']);
      },
      err => {
        this.showError = true;
        this.textError = err.error;
        console.log(err.error);
      }
    )
  }

}
