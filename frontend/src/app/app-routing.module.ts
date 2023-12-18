import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HistoryTicketsComponent } from './history-tickets/history-tickets.component';
import { TicketsCatalogComponent } from './tickets-catalog/tickets-catalog.component';
import { FrequentlyQuestionsComponent } from './frequently-questions/frequently-questions.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-ticket', component: CreateTicketComponent},
  {path: 'history-tickets', component: HistoryTicketsComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'ticket/:id', component: TicketDetailsComponent},
  {path: 'tickets-catalog', component: TicketsCatalogComponent},
  {path: 'frequently-questions', component: FrequentlyQuestionsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
