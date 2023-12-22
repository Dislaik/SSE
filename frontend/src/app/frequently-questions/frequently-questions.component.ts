import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { jwtDecode } from 'jwt-decode';
import { QuestionService } from '../service/question.service';
import { CreateQuestion } from '../dto/create-question';
import { NotifierService } from 'angular-notifier';
import { Question } from '../entity/question';
import { UpdateQuestion } from '../dto/update-question';
import { CreateLog } from '../dto/create-log';
import { LogService } from '../service/log.service';

@Component({
  selector: 'app-frequently-questions',
  templateUrl: './frequently-questions.component.html',
  styleUrls: ['./frequently-questions.component.css']
})
export class FrequentlyQuestionsComponent implements OnInit {
  private readonly notifier: NotifierService;

  page: string;
  title: string;
  allPages: string;
  role: string;

  inputQuestion: string;
  inputAnswer: string;

  questions: Question[];
  questionTargetId: number;
  inputUpdateQuestion: string;
  inputUpdateAnswer: string;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private questionService: QuestionService,
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
      this.page = 'frequently-questions';
      this.title = 'Preguntas frecuentes';

      this.inputQuestion = "";
      this.inputAnswer = "";



      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/frequently-questions'}
      };
      this.allPages = JSON.stringify(pages);


      this.questionService.getAll().subscribe(
        data => {
          this.questions = data;
        },
        err => {

        }
      )

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnAddQuestion(): void {
    const createQuestion = new CreateQuestion(this.inputQuestion, this.inputAnswer);

    this.questionService.create(createQuestion).subscribe(
      data => {
        this.notifier.notify('success', "La pregunta se ha creado con exito!");

        this.questionService.getAll().subscribe(
          data => {
            this.questions = data;
          },
          err => {
  
          }
        );


        this.logService.create(new CreateLog("Se añadió una pregunta", 1)).subscribe(
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

  ngOnUpdateQuestion(): void {
    const updateQuestion = new UpdateQuestion(this.inputUpdateQuestion, this.inputUpdateAnswer);

    this.questionService.update(this.questionTargetId, updateQuestion).subscribe(
      data => {
        this.notifier.notify('success', "La pregunta se ha actualizado con exito!");

        this.questionService.getAll().subscribe(
          data => {
            this.questions = data;
          },
          err => {
  
          }
        );

        this.logService.create(new CreateLog("Se actualizó una pregunta", 2)).subscribe(
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

  ngOnDeleteQuestion(question): void {
    const questionId = question.id
    
    
    this.questionService.delete(questionId).subscribe(
      data => {
        this.notifier.notify('success', "La pregunta se ha eliminado con exito!");

        this.questionService.getAll().subscribe(
          data => {
            this.questions = data;
          },
          err => {
  
          }
        );

        this.logService.create(new CreateLog("Se eliminó una pregunta", 3)).subscribe(
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

  ngOnGetUserId(question): void {
    this.questionTargetId = question.id;
  }

  ngOnClearUserInput(): void {
    this.inputUpdateQuestion = "";
    this.inputUpdateAnswer = "";
  }

}
