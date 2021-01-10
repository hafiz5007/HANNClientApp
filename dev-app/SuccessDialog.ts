import {autoinject} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';

@autoinject
export class SuccessDialog {

    constructor(public controller: DialogController) {

      this.controller.settings.lock = false;
      this.controller.settings.centerHorizontalOnly = true;      
    }
    message ="";
    title ="";
    activate(data) {
        this.message = data.message;
        this.title = data.title;
    }    

  //   canActivate(data) {
  //     this.message = data;
  // }
  
  //When the user clicks on the 'Yes' button the controller closes the dialog 
  //and returns a promise that when resolved, it wil give us a response with a .wasCancelled property set to false and
  //an .output property set to this.info    
  yes(): void {
      this.controller.ok(true);
  }
  
  //When the user clicks on the 'No' button the controller closes the dialog box
  //and sets the response's .wasCancelled property to true
  no(): void{
      this.controller.cancel();
  }
}
