import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CategoryResponse,
  Question,
  QuestionsResponse,
} from '../interfaces/quiz-maker.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _questions = new BehaviorSubject<Question[]>([]);
  questions$ = this._questions.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    const url = 'https://opentdb.com/api_category.php';

    return this.http.get<CategoryResponse>(url);
  }

  getQuestions(category: number, difficulty: string) {
    const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;

    this.http.get<QuestionsResponse>(url).subscribe((res) => {
      this._questions.next(this.mixAnswers(res.results));
    });
  }

  resetQuestions() {
    this._questions.next([]);
  }

  private mixAnswers(questions: Question[]): Question[] {
    questions.forEach((qtn) => {
      let mixedAnswers = Object.assign([], qtn.incorrect_answers);
      mixedAnswers.splice(
        ((qtn.incorrect_answers.length + 1) * Math.random()) | 0,
        0,
        qtn.correct_answer
      );
      qtn.mixed_answers = mixedAnswers;
    });

    return questions;
  }
}
