import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  mensajes:any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.mensajes=this.dataService.getPosts();
  }

  escucharClick(id:number){
    console.log('click en: ',id);
  }

}
