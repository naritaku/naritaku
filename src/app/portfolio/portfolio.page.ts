import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
  url="https://script.google.com/macros/s/AKfycbxY6Y6rhXUszdcOFdSJy5NT_-2u-lDbcgNZ3u_JT6gdLVQPQoQ/exec";
  productCards:{
    overviewMedia:string,
    mediaSrc:string,
    title:string,
    subTitle:string,
    chips:string[],
    content:string,
    url:{
      movieURL:string[],
      photoURL:string[],
      youtubeURL:string,
      serviceURL:string,
      logURL:string,
    },
  }[]=[];
  constructor(
    private router: Router,
    private http:HttpClient,
    private dataService: DataService,
  ) {

  }

  ngOnInit() {
    this.http.get(this.url).subscribe((response:any)=>{
      if(response.state=="success"){
        response.data.forEach((card) => {
          //console.log(card);
          this.productCards.push(card);
        })
        this.dataService.saveCardData(this.productCards);
        console.log(response);
      }else{
        console.log("faild");
      }
    },error=>{
     //失敗時の処理
     console.log(error);
    });
  }

}
