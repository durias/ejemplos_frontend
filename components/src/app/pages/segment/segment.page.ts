import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superHeroes:Observable<any>;
  textoBuscar:string='';
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.superHeroes=this.dataService.getHeroes();
  }

  segmentChanged(event){
    this.textoBuscar=event.detail.value;
  }


}
