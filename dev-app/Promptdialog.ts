import { inject } from 'aurelia-dependency-injection';
import {DialogController} from 'aurelia-dialog';

inject(DialogController)
export class Promptdialog {
  //static inject = [DialogController];

  public _controller: DialogController;
  public answer: string = "";
  public question: string = "";

  constructor(controller) {
    this._controller = controller;
    this.answer = null;

    controller.settings.lock = false;
  }

  activate(question) {
    this.question = question;
  }
}
