import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() index:number;
  @Input() enFavoritos;

  constructor(private iab:InAppBrowser,
              private actionSheetCtrl:ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocalService:DataLocalService,
              private toastCtrl:ToastController) { }

  ngOnInit() {
  
  }

  abrirNoticia(){
      const browser = this.iab.create(this.noticia.url,'_system');
  
    }



  async  lanzarMenu() {
    let guardarBorrarBtn;
    if(this.enFavoritos){
      guardarBorrarBtn= {
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log("Borrar de favorito");
          this.datalocalService.borrarNoticia(this.noticia);
          this.presentToast("Favorito eliminado");
        }
      }

    }else{
      guardarBorrarBtn= {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          this.datalocalService.guardarNoticia(this.noticia);
          this.presentToast("Añadido a favoritos");
        }
      };

    }


    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [ 
        {
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass:'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
