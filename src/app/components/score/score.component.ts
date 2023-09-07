import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswersForm, Question } from 'src/app/interfaces/quiz-maker.interface';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  answers: AnswersForm;
  questions: Question[] = [];
  correctAnswers = 0;

  constructor(private service: QuizService, private router: Router) {
    this.answers = this.router.getCurrentNavigation()?.extras
      .state as AnswersForm;
  }

  ngOnDestroy() {
    this.service.resetQuestions();
  }

  ngOnInit() {
    this.service.questions$.subscribe((res) => {
      this.questions = res;
      if (!res.length) {
        this.router.navigate(['quiz-maker']);
      }
    });

    this.questions.map((question, index) => {
      if (
        question.correct_answer === this.answers[index as keyof AnswersForm]
      ) {
        this.correctAnswers++;
      }
    });
  }

  getAnswers(i: number): string {
    return this.answers[i as keyof AnswersForm];
  }
}
