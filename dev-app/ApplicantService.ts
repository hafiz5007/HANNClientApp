 import { HttpClient, json } from 'aurelia-fetch-client';
 import { inject } from 'aurelia-framework';
 import { Applicant } from './applicant';

//@inject(HttpClient)
 export class ApplicantService {
  
  private http: HttpClient;

    constructor() {

     this.http = new HttpClient();
        const baseUrl = 'https://localhost:44395/api/';        
        //const baseUrl = 'https://webhook.site/c3cbb244-53c7-4674-83df-41e5b654b7db';

        this.http.configure(config => {
            config.useStandardConfiguration()
                .withBaseUrl(baseUrl)            
        });
    }; 
    
     
   public   addApplicant = function(applicant : Applicant){
     
        return this.http.fetch('Applicant', {
            method: 'post',
            body: json(applicant)
            })
            .then(response => response.json())
            .then(createdBook => {
                return createdBook;
            })
               .catch(error => {
                   console.log('Error adding book.');
            });

 };

 

    getApplicants(){

        return this.http.fetch('Applicant', { 
          method: 'get'})
                 .then(response => response.json())
                 .then(applicants => {
                    return applicants;
                 })
                .catch(error => {
                    console.log('Error retrieving books.');
                    return [];
                });

    }

    
    deleteApplicant(applicant){
        return this.http.fetch(`Applicant/${applicant.id}`, {
                method: 'delete'
                })
                .then(response => response.json())
                .then(responseMessage => {
                    return responseMessage;
                })
                  .catch(error => {
                       console.log('Error deleting book.');
                  });


    }


    getValidCountryApplicant(countryName){
      var httpClient = new HttpClient();
      var url = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true";

      return httpClient.fetch(url, {
              method: 'get'
              })
              .then(response => response.json())
              .then(responseMessage => {
                  return responseMessage;
              }).catch(error => {
                     console.log('Error deleting book.');
                });
                
  }
    



}
//     constructor(private http: HttpClient) {

        
//         const baseUrl = 'https://localhost:44395/api/';        
//         //const baseUrl = 'https://webhook.site/c3cbb244-53c7-4674-83df-41e5b654b7db';

//         http.configure(config => {
//             config.useStandardConfiguration()
//                 .withBaseUrl(baseUrl)            
//         });
//     } 
// //var http : HttpClient;
    
// /*
//     constructor(http : HttpClient){
//         this.http = http;


//         http.configure(config => {
//             config.withBaseUrl(baseUrl);
//         })
//     }
//     */

//     // getAll(): Promise<Applicant[]> {
//     //     return this.http.fetch('')
//     //         .then(response => response.json())
//     //         .then(applicants => Array.from(applicants, c => new Applicant(c)))
//     //         .catch(error => console.log(error));
//     // }

//     // getById(id: string): Promise<Applicant> {
//     //     return this.http.fetch(id)
//     //         .then(response => response.json())
//     //         .then(applicant => new Applicant(applicant))
//     //         .catch(error => console.log(error));
//     // }

//    /* public save = function(applicant: Applicant): Promise<Applicant> {       


//       /*  return this.http.fetch('',
//             {
//                 method: 'post',
//                 body: json(applicant)
//             })
//             .then(response => response.json())
//             //.then(applicant => new Applicant(applicant))
//             .catch(error => console.log(error));

//             */

//        /*     return this.http.fetch('https://webhook.site/c3cbb244-53c7-4674-83df-41e5b654b7db', {
//                 method: 'post',
//                 body: json(applicant)
//                 })
//                 .then(response => response.json())
//                 .then(createdBook => {
//                     return createdBook;
//                 })
//                    .catch(error => {
//                        console.log('Error adding book.');
//                 });
//     } */



//     getBooks(){

//         return this.http.fetch('Applicant')
//                  .then(response => response.json())
//                  .then(books => {
//                     return books;
//                  })
//                 .catch(error => {
//                     console.log('Error retrieving books.');
//                     return [];
//                 });

//     }

//     getShelves(){

//         return this.http.fetch('shelves')
//                  .then(response => response.json())
//                  .then(shelves => {
//                     return shelves;
//                  })
//                 .catch(error => {
//                     console.log('Error retrieving shelves.');
//                     return [];
//                 });
//     }

//     getGenres(){

//         return this.http.fetch('genres')
//                  .then(response => response.json())
//                  .then(genres => {
//                     return genres;
//                  }).
//                 catch(error => {
//                     console.log('Error retrieving genres.');
//                        return [];
//                 });
//     }


//     }

//     deleteBook(book){
//         return this.http.fetch(`book/${book._id}`, {
//                 method: 'delete'
//                 })
//                 .then(response => response.json())
//                 .then(responseMessage => {
//                     return responseMessage;
//                 })
//                   .catch(error => {
//                        console.log('Error deleting book.');
//                   });


//     }

//     saveBook(book){
//         return this.http.fetch(`book/${book._id}`, {
//                     method: 'put',
//                     body: json(book)
//                  })
//                  .then(response => response.json())
//                  .then(savedBook => {
//                     return savedBook;
//                     })
//                     .catch(error => {
//                        console.log('Error saving book.');
//                   });


//     }

// }
