import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../model.question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  checkAnswer: Map<number, number> = new Map<number, number>();
  counter = 0;
  step = 0;

  myGroup = new FormGroup({
    answer1: new FormControl(Validators.required)
 });

  constructor(private service: QuestionService) { }

  ngOnInit() {
    this.service.loadQuestions().subscribe(
      allQuestions => this.questions = allQuestions,
      error => console.log("Error:: " + error)
    );
  }

  onSubmit() {
    this.checkAnswer.forEach((value: number, key: number) => {
      this.counter += value;
    });
  }

  nextQuestion(step) {
    this.step = step + 1;
  }

  previousQuestion(step) {
    this.step = step - 1;
  }

  changeDetected(questionId, optionId) {
    if (this.questions[questionId].options[optionId].isAnswer)
      this.checkAnswer.set(questionId, 1);
    else
      this.checkAnswer.set(questionId, 0);

  }

}
