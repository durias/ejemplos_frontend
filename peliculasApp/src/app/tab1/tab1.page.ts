import { Component, OnInit } from '@angular/core';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[]=[];
  populares:Pelicula[]=[];

  constructor(private moviesService:MoviesService) {

  }

  ngOnInit(){
    this.moviesService.getFeature().
    subscribe((resp)=>{
      console.log("respuesta",resp);
      this.peliculasRecientes=resp.results;
    });
    this.getPopulares();


  }

  cargarMastab1(){
    this.getPopulares();
  }

  getPopulares(){
    
    this.moviesService.getPopulares().subscribe(resp=>{
      console.log('Populares',resp);
      const arrTemp=[...this.populares,...resp.results];
      this.populares=arrTemp;
    });

  }

}
