
export class Applicant {

  public Id = 0;
  public Name = "";
  public FamilyName= "";
  public Address= "";
  public CountryOfOrigin= "";
  public EMailAdress= "";
  public Age = 0;
  public Hired : boolean = false;

  // Applicant(name, familyName, address, countryOfOrigin, eMailAdress,  age, hired)
  // {
  //     this. Name = name;
  //     this. FamilyName = familyName;
  //     this. Address = address;
  //     this. CountryOfOrigin =countryOfOrigin;
  //     this. EMailAdress = eMailAdress;
  //     this. Age = age;
  //     this. Hired = hired;    
  // }

  Applicant(applicant: Applicant) {
    
    this.Id = applicant.Id;
    this.Name = applicant.Name;
    this.FamilyName = applicant.FamilyName;
    this.Address = applicant.Address;
    this.CountryOfOrigin = applicant.CountryOfOrigin;
    this.EMailAdress = applicant.EMailAdress;
    this.Age = applicant.Age;
    this.Hired = applicant.Hired;
  }

}


