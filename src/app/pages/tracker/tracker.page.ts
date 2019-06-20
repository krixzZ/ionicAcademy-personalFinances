import { FilterPopoverPage } from './../filter-popover/filter-popover.page';
import { Storage } from '@ionic/storage';
import { CashService, Transaction, CashFlow } from './../../services/cash.service';
import { CashFlowModalPage } from './../cash-flow-modal/cash-flow-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, IonList, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  selectedCurrency = '';
  cashFlow: number = 0;

  @ViewChild('slidingList') slidingList: IonList;

  constructor(private modalCtrl: ModalController, private cashService: CashService, private plt: Platform, private storage: Storage, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  // sol cargará cuando los plugin de cordova estén listos con la vista
  async ionViewWillEnter() {
    await this.plt.ready();
    this.loadTransactions();
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

  async loadTransactions() {
    await this.storage.get('selected-currency').then(currency => {
      this.selectedCurrency = currency.toUpperCase();
    });

    console.log('selected currency: ', this.selectedCurrency);

    await this.cashService.getTransactions().then(trans => {
      this.allTransactions = trans;
      this.transactions = trans;
      console.log('transactions', trans);
    });

    this.updateCashFlow();
  }

  // efecto cierre sliding item
  async removeTransaction(i) {
    this.transactions.splice(i, 1);
    this.cashService.updateTransactions(this.transactions);
    await this.slidingList.closeSlidingItems();
    this.updateCashFlow();
  }

  updateCashFlow() {
    let result = 0;
    this.transactions.map(trans => {
      result += trans.type == CashFlow.Expense ? -trans.value : trans.value;
    });

    this.cashFlow = result;
  }

  async openFilter(e) {
    const popover = await this.popoverCtrl.create({
      component: FilterPopoverPage,
      event: e
    });

    await popover.present();

    popover.onDidDismiss().then(res => {
      if (res && res.data) {

        let selectedName = res.data.selected.name;

        if (selectedName == 'All') {
          this.transactions = this.allTransactions;
        } else {
          this.transactions = this.allTransactions.filter(trans => {
            return trans.category.name == selectedName;
          });
        }
      }
    });
  }
}
