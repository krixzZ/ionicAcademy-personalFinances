import { CashFlow, CashService } from './../../services/cash.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/services/cash.service';

@Component({
  selector: 'app-cash-flow-modal',
  templateUrl: './cash-flow-modal.page.html',
  styleUrls: ['./cash-flow-modal.page.scss'],
})
export class CashFlowModalPage implements OnInit {

  categories = [
    { name: 'Food', icon: 'pizza' },
    { name: 'Rent', icon: 'business' },
    { name: 'Shopping', icon: 'cart' },
    { name: 'Sports', icon: 'fitness' },
    { name: 'Education', icon: 'school' },
    { name: 'Travel', icon: 'airplane' },
  ];

  created_at = new Date().toISOString();

  transaction: Transaction = {
    created_at: Date.now(),
    title: '',
    value: 0,
    type: CashFlow.Expense,
    category: this.categories[0]
  };


  constructor(private modalCtrl: ModalController, private cashService: CashService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  addTransaction() {

  }

  close() {
    this.modalCtrl.dismiss();
  }

}
