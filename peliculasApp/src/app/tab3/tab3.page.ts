import { Component, OnInit } from '@angular/core';
import { Genre, Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  peliculas:PeliculaDetalle[]=[];
  generos: Genre[]=[];
  favoritoGenero:any[]=[];

  async ngOnInit(){
    
  }

  async ionViewWillEnter(){
    this.peliculas= await this.dataLocal.cargarFavoritos();
    this.generos=await this.movieService.cargarGeneros();
    console.log(this.peliculas);
    this.peliculasPorGenero(this.generos,this.peliculas);
  }

  constructor(private dataLocal:DataLocalService,
              private movieService:MoviesService) {}


  peliculasPorGenero(generos:Genre[],peliculas:PeliculaDetalle[]){
    this.favoritoGenero=[];
    generos.forEach(genero=>{
      this.favoritoGenero.push({
        genero:genero.name,
        pelis:peliculas.filter(peli=>{
          return peli.genres.find(genre=>genre.id===genero.id);
        })
      });

    });
    console.log(this.favoritoGenero);
  }   

}
