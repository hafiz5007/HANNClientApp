import { HttpClient, json } from 'aurelia-fetch-client';
import { bindable, autoinject } from 'aurelia-framework';
import { inject, NewInstance } from "aurelia-dependency-injection";
import { ApplicantService } from './ApplicantService';
import { Applicant } from './Applicant';
import { ValidationRules } from 'aurelia-validation';
import { ValidationController, validateTrigger, ValidateResult } from "aurelia-validation";
import { BootstrapFormRenderer } from "./BootstrapFormRenderer";
//import { inject } from 'aurelia-framework';

import { DialogService } from 'aurelia-dialog';
import { Confirm } from './Confirm';
import { SuccessDialog } from './SuccessDialog';



//@inject(NewInstance.of(DialogService))
//@inject(NewInstance.of(ValidationController))

//@inject(DialogService, NewInstance.of(ValidationController))
@autoinject
export class App {
  public message = '';
  public countryErrorMesssage = "";
  private applicants = new Array<Applicant>();
  private canSave: boolean = false;
  private canReset: boolean = false;

  private applicantRules: ValidationRules;


  constructor(private applicant: Applicant, private validationController: ValidationController, public applicantService: ApplicantService, private http: HttpClient, public dlgService: DialogService) {

    // object initilization
    this.applicant = new Applicant();
    this.applicantService = new ApplicantService();
    this.dlgService = dlgService;
    this.validationController = validationController;


    this.applicantRules = ValidationRules
      .ensure('Name').minLength(5).required()
      .ensure('FamilyName').minLength(5).required()
      .ensure('Address').minLength(10).required()
      .ensure('CountryOfOrigin').required()
      .ensure('EMailAdress').email().required()
      .ensure('Age').min(20).max(60).required()
      .rules;

    validationController.addRenderer(new BootstrapFormRenderer());

    // set the validation rules



    this.getAllApplicants();

  }

  //Start Reset Button Ability 
  public setButtonAbility = function (value: boolean) {
    this.canSave = value;
    this.canReset = value;
    if (!value) {
      this.validationController.reset();
    }
  }
  //End Reset Button Ability


  /**
   * Onlcik Reset Button Click 
   */

  public onClickResetButtonClick = function () {
    // Open 
    if (this.dlgService != null) {

    //   this.dlgService.open({
    //     viewModel: Confirm
    //     , model: this.applicant
    // }).then(result => {
    //     if (result.wasCancelled) return;
  
    //     if (!result.wasCancelled ) {
    //       this.applicant = new Applicant();
    //       this.setButtonAbility(false);
    //     }
    //    // this.action();
    // });

      this.openConfirmationModal('Are you sure, Do you want to reset field data?');
    }
    // else {
    //   this.applicant = new Applicant();
    //   this.setButtonAbility(false);
    // }
  }

  // End Reset Button function 

  // Start Dialog 
  openConfirmationModal(message) {

    this.dlgService.open({
      viewModel: Confirm
      , model: message
  }).whenClosed().then(result => {
      if (result.wasCancelled) return;

      if (!result.wasCancelled) {
        this.applicant = new Applicant();
        this.setButtonAbility(false);
      }
     // this.action();
  });

  }

 public openSuccessDialogModal(title, message) {

  var data = {title : title, message : message};
    this.dlgService.open({
      viewModel: SuccessDialog
      , model: data
  }).whenClosed().then(result => {
      if (result.wasCancelled) return;

      if (!result.wasCancelled) {
        this.applicant = new Applicant();
        this.setButtonAbility(false);
      }
     // this.action();
  });
}
  // end dialog 





  /****
   * Save Button click 
   * Call to Service layer for creating applicant
   * applicantService service layer call the function addApplicant
   *  */
  public onClickSaveButtonClick() {

    console.log('api call ');

    this.validationController.validate({ object: this.applicant, rules: this.applicantRules }).then(result => {
      if (result.valid) {
        // validation succeeded
        console.log("validation succeeded");

        if (this.applicantService != null) {
          this.applicantService.addApplicant(this.applicant).then(applicationData => {

            if(applicationData.status != null &&  applicationData.status == 400)
            {
              this.openSuccessDialogModal('Failed!',applicationData.title);
            }
            else 
            {
            this.applicants.push(applicationData);

            this.applicant = new Applicant();
            console.log(applicationData);

            this.setButtonAbility(false);

            this.openSuccessDialogModal('Success!','Applicant created succesfully');
            console.log("Applicant created succesfully");
            }

          });
        }
      } else {
        // validation failed
        console.log("validation failed");
      }
    });

  }

  /**
   * End of function  onClickSaveButtonClick
   */


  // get all aplicant from Api Service 
  public getAllApplicants = function () {
    if (this.applicantService != null) {
      this.applicantService.getApplicants().then(applicants => this.applicants = applicants);
    }

  }

  // delete applicant from api service 

  public deleteApplicants = function (applicant) {
    if (this.applicantService != null) {
      this.applicantService.deleteApplicant(applicant).then(applicants => {
        this.getAllApplicants();

      }

      );
    }

  }

  // validate form 
  public onValidateData = function () {

    // if (inputFieldType == 1) {
    //   this.applicantRules = ValidationRules
    //     .ensure('Name').minLength(5).required()
    //     .rules;
    // }
    // else if (inputFieldType == 2) {
    //   this.applicantRules = ValidationRules        
    //     .ensure('FamilyName').minLength(5).required()
    //     .rules;
    // } else if (inputFieldType == 3) {
    //   this.applicantRules = ValidationRules
    //     .ensure('Address').minLength(10).required()      
    //     .rules;
    // } else if (inputFieldType == 4) {
    //   this.applicantRules = ValidationRules
    //     .ensure('EMailAdress').email().required()
    //     .rules;
    // } else if (inputFieldType == 5) {
    //   this.applicantRules = ValidationRules
    //     .ensure('Age').min(20).max(60).required()
    //     .rules;
    // }

    this.validationController.validate({ object: this.applicant, rules: this.applicantRules }).then(result => {
      if (result.valid) {
        // validation succeeded

        this.setButtonAbility(true);
      } else {
        // validation failed        
        this.canReset = this.checkAllField();
      }
    });
  }
  // end validation form 


  // get valid country name

  public isValidateCountry = function () {
    if (this.applicantService != null) {

      var countryName = this.applicant.CountryOfOrigin;

      this.applicantService.getValidCountryApplicant(countryName).then(result => {

        if (result != null && result.status == 404) {
          this.countryErrorMesssage = result.message;
        }
        else {
          this.countryErrorMesssage = "";
        }
      }

      );
    }

  }

  //end valid country function 
  // Start field value check 
  public checkAllField = function () {

    if (this.applicant.Id > 0) {
      return true;
    }
    else if (this.applicant.Age > 0) {
      return true;
    }
    else if (this.applicant.Hired) {
      return true;
    } else if (this.applicant.Address != null && this.applicant.Address.length > 0) {
      return true;
    }
    else if (this.applicant.CountryOfOrigin != null && this.applicant.CountryOfOrigin.length > 0) {
      return true;
    }
    else if (this.applicant.FamilyName != null && this.applicant.FamilyName.length > 0) {
      return true;
    }
    else if (this.applicant.Name != null && this.applicant.Name.length > 0) {
      return true;
    }

    // for (var key in this.applicant) {
    //   if ( this.applicant[key] !== null && this.applicant[key] != "")
    //     return false;
    // }

    this.setButtonAbility(false);

    return false;
  }

  // End filed value check 

}
