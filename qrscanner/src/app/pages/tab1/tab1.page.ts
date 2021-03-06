import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts={
    allowSlidesPrev:false,
    allowSlideNext:false
  };

  constructor(private barcodeScanner:BarcodeScanner) {}

  ionViewWillEnter(){
    console.log('ViewWillEnter');
    this.scan();
  }

  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });

  }

}
