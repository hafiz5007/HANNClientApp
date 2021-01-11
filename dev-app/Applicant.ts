
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

  Applicant() {
    
    this.Id = 0;
    this.Name = "";
    this.FamilyName= "";
    this.Address= "";
    this.CountryOfOrigin= "";
    this.EMailAdress= "";
    this.Age = 0;
    this.Hired = false;
  }

}


