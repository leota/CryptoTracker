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
  private convert = config.convert;
  private formatPrice = 'price_' + this.convert.toLowerCase();
  private investedCapital: number = 0;
  private currentCapital: number = 0;
  private statusList: Array<any> = [];

  constructor(private http: HttpService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getInvestedCapital(this.data);
    this.getAllResults();
  }

  getAllResults() { // returns a promise for 250 results
    let prom, me = this;
    for (let i = 0; i < me.data.length; i++) { // chain four more times
      prom = me.http.retreiveData(me.data[i].currency, me.convert);
      prom = prom.then(res => {
        console.log(me.formatPrice)
        let status = {
          name: res[0].name,
          percent_change_1h: res[0].percent_change_1h,
          percent_change_24h: res[0].percent_change_24h,
          percent_change_7d: res[0].percent_change_7d,
          price: res[0][me.formatPrice],
          symbol: res[0].symbol,
          amount: me.data[i].amount,
          investedCapital: me.data[i].investedCapital
        };
        status['currentCapital'] = status.amount * (parseFloat(status.price));
        status['capitalDifference'] = status['currentCapital'] - status.investedCapital;
        me.statusList = me.statusList.concat(status);
        return me.http.retreiveData(me.data[i].currency, me.convert);
      });
    }
    return prom.then(res => {
      me.statusList.concat(res);
      console.log('RESS', me.statusList);
      me.calculateCurrentCapital(me.statusList);
    });
  }

  getInvestedCapital(data): void {
    data.forEach(el => {
      this.investedCapital += el.investedCapital;
    })
    console.log('Invested:', this.investedCapital);
  }

  calculateCurrentCapital(data): void {
    data.forEach(el => {
      this.currentCapital += el.currentCapital;
    })
    console.log('Current:', this.currentCapital);
  }
}
