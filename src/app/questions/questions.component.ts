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
  counter = 0;
  step = 0;
  flag: boolean;
  answer: string;

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
    console.log(this.myGroup);
  }

  nextQuestion(step) {
    console.log(step);
    this.step = this.step + 1;
    console.log(this.myGroup.value);
  }

  previousQuestion() {
    this.step = this.step - 1;
  }

  changeDetected(questionId, optionId) {
    console.log("The question id is: " + questionId);
    console.log("The option id is: " + optionId);
    if (this.questions[questionId].options[optionId].isAnswer)
      this.counter = this.counter + 1;
  }

  // loadQuestions() {
  //   this.service.loadQuestions().subscribe(
  //     allQuestions => console.log(allQuestions),
  //     error => console.log("Error:: " + error)
  //   );
  // }

}
