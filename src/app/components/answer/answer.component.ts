import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/interfaces/quiz-maker.interface';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {
  @Input() question!: Question;
  @Input() form!: FormGroup;
  @Input() controlIndex!: number;

  selected = '';

  setValue(newValue: string) {
    this.selected = newValue;
    this.form.controls[this.controlIndex].setValue(newValue);
  }
}
