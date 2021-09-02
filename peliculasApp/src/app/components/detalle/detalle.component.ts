import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  enfavoritos=false;
  pelicula:PeliculaDetalle={};
  actores:Cast[]=[];
  oculto=150;
  slideOptActores={
    slidesPerView:3.3,
    freeMode:true,
    spacebetween:-5
  }


  constructor(private moviesService:MoviesService,
              private modalCtrl:ModalController,
              private dataLocal:DataLocalService) { }

  async ngOnInit() {

    this.enfavoritos= await this.dataLocal.existePelicula(this.id);
    
    this.moviesService.getPeliculaDetalle(this.id)
    .subscribe(resp=>{
      console.log(resp);
      this.pelicula=resp;
    });
  
    this.moviesService.getActoresPelicula(this.id)
    .subscribe(resp=>{
      console.log(resp);
      this.actores=resp.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.enfavoritos=!this.enfavoritos;
    this.dataLocal.guardarPelicula(this.pelicula);
  }

}
