import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpService } from './http.service';
import { config } from '../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private data = config.data;
  private investedCapital: number = 0;
  private currentCapital: number = 0;
  private statusList: Array<any> = [];

  constructor(private http: HttpService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    let me = this;
    me.statusListInit(me.data.length);
    me.getInvestedCapital(me.data);
    me.statusListUpdate();
    // Update data every 10 seconds
    setInterval(function () {
      me.statusListUpdate();
    }, 10000);
  }

  statusListInit(length: number) {
    for (let i = 0; i < length; i++) {
      let status = {
        name: '',
        percent_change_1h: '',
        percent_change_24h: '',
        percent_change_7d: '',
        price: 0,
        symbol: '',
        amount: 0,
        investedCapital: 0,
        currentCapital: 0,
        capitalDifference: 0
      };
      this.statusList.push(status);
    }
  }

  statusListUpdate() {
    let prom, me = this;
    for (let i = 0; i < me.data.length; i++) {
      prom = me.http.retreiveData(me.data[i].currency);
      prom = prom.then(res => {
        me.statusList[i].name = res[0].name;
        me.statusList[i].percent_change_1h = res[0].percent_change_1h;
        me.statusList[i].percent_change_24h = res[0].percent_change_24h;
        me.statusList[i].percent_change_7d = res[0].percent_change_7d;
        me.statusList[i].price = res[0].price_usd;
        me.statusList[i].symbol = res[0].symbol;
        me.statusList[i].amount = me.data[i].amount;
        me.statusList[i].investedCapital = me.data[i].investedCapital;
        me.statusList[i].currentCapital = me.statusList[i].amount * (parseFloat(me.statusList[i].price));
        me.statusList[i].capitalDifference = me.statusList[i].currentCapital - me.statusList[i].investedCapital;

        return me.http.retreiveData(me.data[i].currency);
      });
    }
    return prom.then(res => {
      me.statusList.sort(function (a, b) {
        return parseFloat(b.currentCapital) - parseFloat(a.currentCapital);
      });
      me.calculateCurrentCapital(me.statusList);
      me.ref.detectChanges();
    });
  }

  getInvestedCapital(data): void {
    data.forEach(el => {
      this.investedCapital += el.investedCapital;
    })
  }

  calculateCurrentCapital(data): void {
    // check if all data have been retreived
    if (data.length != this.data.length) {
      return;
    }
    this.currentCapital = 0;
    data.forEach(el => {
      this.currentCapital += el.currentCapital;
    })
  }
}
