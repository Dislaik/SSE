import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HistoryTicketsComponent } from './history-tickets/history-tickets.component';
import { TicketsCatalogComponent } from './tickets-catalog/tickets-catalog.component';
import { FrequentlyQuestionsComponent } from './frequently-questions/frequently-questions.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    SidebarComponent,
    NavbarComponent,
    CreateTicketComponent,
    HistoryTicketsComponent,
    TicketsCatalogComponent,
    FrequentlyQuestionsComponent,
    BreadcrumbComponent,
    TicketDetailsComponent,
    TicketsComponent,
    UsersComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
