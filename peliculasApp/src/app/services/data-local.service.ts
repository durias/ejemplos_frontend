import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage'
import { PeliculaDetalle } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private storage:Storage,
              private toastCtrl:ToastController) {
    this.storage.create();
    this.cargarFavoritos();
   }
  peliculas:PeliculaDetalle[]=[];

  async presentToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message:msg,
      duration: 2000
    });
    toast.present();
  }

  guardarPelicula(pelicula:PeliculaDetalle){

    let existe=false;
    let mensaje='';

    for(const peli of this.peliculas){
      if(peli.id===pelicula.id){
        existe=true;
        break;
      }
    }
    if(existe){
      this.peliculas=this.peliculas.filter(peli=>peli.id!==pelicula.id);
      mensaje='Eliminado de favoritos.';
    }else{
      this.peliculas.push(pelicula);
      mensaje='Agregado a favoritos.';
    }
    this.presentToast(mensaje);
    this.storage.set('peliculas',this.peliculas);
  }

  async cargarFavoritos(){
    const peliculas= await this.storage.get('peliculas');
    this.peliculas=peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id){
    id=Number(id);

    await this.cargarFavoritos();
     
    let existe=false;
    for(const peli of this.peliculas){
      if(peli.id===id){
        existe=true;
        console.log("la encontró");
        break;
      }
    }
    
    
    return existe;
  }
}
