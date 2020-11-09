
export class Question {

  constructor(
    public Id: number,
    public name: string,
    public options: Options[]
  ) {}

}

export class Options {

  constructor(
    public Id: number,
    public questionId: number,
    public name: string,
    public isAnswer: boolean
  ) {}
}

