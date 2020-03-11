import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  cardData: {
    overviewMedia:string,
    mediaSrc:string,
    title:string,
    subTitle:string,
    chips:string[],
    content:string,
    url:{
      photoURL:string[],
      movieURL:string[],
      youtubeURL:string,
      serviceURL:string,
      logURL:string,
    },
  }[]=[];

  saveCardData(card:any){
    this.cardData=card;
    console.log(this.cardData);
  }

  getCardData(){
    console.log(this.cardData);
    return this.cardData;
  }
}
