import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { ScoreComponent } from './components/score/score.component';

const routes: Routes = [
  { path: 'quiz-maker', component: QuizMakerComponent },
  { path: 'score', component: ScoreComponent },
  { path: '', redirectTo: '/quiz-maker', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz-maker' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
