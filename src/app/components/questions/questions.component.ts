import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/quiz-maker.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() questions: Question[] = [];

  form!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const group: any = {};

    this.questions.forEach((question, index) => {
      group[index] = new FormControl('', Validators.required);
    });
    this.form = new FormGroup(group);
  }

  onSubmit() {
    const navigationExtras: NavigationExtras = {
      state: this.form.value,
    };
    this.router.navigate(['score'], navigationExtras);
  }
}
