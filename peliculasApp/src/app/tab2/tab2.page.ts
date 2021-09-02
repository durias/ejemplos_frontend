import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula} from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private moviesService:MoviesService,private modalCtrl:ModalController) {}
  textoBuscar='';
  buscando=false;
  peliculas:Pelicula[]=[];
  busquedas:string[]=['Spiderman','Avengers','El señor de los anillos','La vida es bella'];
  buscar(event){
    const valor=event.detail.value;

    if(valor.length===0){
      this.buscando=false;
      this.peliculas=[];
      return;
    }
    this.buscando=true;
    console.log("valor",valor);
    this.moviesService.buscarPeliculas(valor).
      subscribe(resp=>{
      console.log(resp);
      this.peliculas=resp['results'];
      this.buscando=false;
    });
  }


  async verDetalle(id:string){
    const modal= await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
}


}
