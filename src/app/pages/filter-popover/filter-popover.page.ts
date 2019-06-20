import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.page.html',
  styleUrls: ['./filter-popover.page.scss'],
})
export class FilterPopoverPage implements OnInit {

  categories = [
    { name: 'All', icon: 'apps' },
    { name: 'Food', icon: 'pizza' },
    { name: 'Rent', icon: 'business' },
    { name: 'Shopping', icon: 'cart' },
    { name: 'Sports', icon: 'fitness' },
    { name: 'Education', icon: 'school' },
    { name: 'Travel', icon: 'airplane' },
  ];

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  select(cat) {
    this.popoverCtrl.dismiss({ selected: cat });
  }

}
