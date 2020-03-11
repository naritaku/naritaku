import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../shared/data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],

})
export class ProductDetailsPage implements OnInit {

  url="https://script.google.com/macros/s/AKfycbxY6Y6rhXUszdcOFdSJy5NT_-2u-lDbcgNZ3u_JT6gdLVQPQoQ/exec";

  title:string="";
  content:string="";
  date:string="";
  chips:string[]=[];
  movieURLs:SafeResourceUrl[]=[];
  photoURLs:string[]=[];
  youtubeURL:string="";
  logURL:string="";
  serviceURL:string="";

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
    private dataService: DataService,
    private router:Router,
    private http:HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
//    console.log(this.dataService.getCardData());
    this.productCards=[];
    this.productCards=this.dataService.getCardData();
    if(this.productCards.length==0){
      this.getCardData();
    }else{
      this.showCardData()
    }
  }

  ngOnInit() {
  }

  openurl(url){
    window.open(url);
  }

  showCardData(){
    this.route.paramMap.subscribe((params: ParamMap) => {
          this.title = params.get('product-title');
          this.productCards.forEach((card) => {
            if(this.title==card.title){
              this.content=card.content;
              this.chips=card.chips;
              this.date=card.subTitle;
              this.serviceURL=card.url.serviceURL;
              this.youtubeURL=card.url.youtubeURL;
              this.logURL=card.url.logURL;
              card.url.movieURL.forEach(url => this.movieURLs.push(  this.sanitizer.bypassSecurityTrustResourceUrl(url)));
              this.photoURLs=card.url.photoURL;
              console.log(this.movieURLs)
              console.log(this.photoURLs)
            }
          })
    },error=>{
     //失敗時の処理
        console.log("faild to get params");
    });
    console.log(this.productCards);
  }

  getCardData(){
      this.productCards=[];
      this.http.get(this.url).subscribe((response:any)=>{
        if(response.state=="success"){
          response.data.forEach((card) => {
            //console.log(card);
            this.productCards.push(card);
          })
          console.log(response);
          this.showCardData()
        }else{
          console.log("faild");
        }
      },error=>{
       //失敗時の処理
       console.log(error);
      });
  }
}
