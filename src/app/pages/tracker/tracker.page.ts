import { CashFlowModalPage } from './../cash-flow-modal/cash-flow-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async addCashFlow() {
    let modal = await this.modalCtrl.create({
      component: CashFlowModalPage,
      cssClass: 'modalCss'
    });
    modal.present();

    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        this.loadTransactions();
      }
    });
  }

  loadTransactions() {

  }

}
