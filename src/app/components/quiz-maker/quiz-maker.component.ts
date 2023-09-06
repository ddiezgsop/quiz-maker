import { Component, OnInit } from '@angular/core';
import {
  Question,
  QuizDifficulty,
  CategoryOption,
} from 'src/app/interfaces/quiz-maker.interface';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit {
  difficultyOptions: string[] = [];
  categoryOptions: CategoryOption[] = [];
  selectedDifficulty!: string;
  selectedCategory!: number;
  questions: Question[] = [];

  constructor(private service: QuizService) {}

  ngOnInit() {
    this.difficultyOptions = Object.values(QuizDifficulty);
    this.service.getCategories().subscribe((res) => {
      this.categoryOptions = res.trivia_categories;
    });

    this.service.questions$.subscribe((res) => (this.questions = res));
  }

  selectQuiz() {
    this.service.resetQuestions();
    this.service.getQuestions(this.selectedCategory, this.selectedDifficulty);
  }

  disableSelect(): boolean {
    return !this.selectedCategory || !this.selectedDifficulty;
  }
}
