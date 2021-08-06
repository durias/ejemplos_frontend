import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  albumes:any[]=[];
  textoBuscar:string='';
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getAlbums().subscribe(albumes=>{
     // console.log(albumes);
      this.albumes=albumes;
      this.albumes.push({
        "userId": 88,
      "id": 88,
      "title": "el doch"
      });
      this.albumes.push({
        "userId": 88,
      "id": 88,
      "title": "Danilo null"
      });
    });
    
    console.log(this.albumes);
  }

  onSearchChange(event){ 
    console.log(event.detail.value); 
   this.textoBuscar=event.detail.value;
  }

}
