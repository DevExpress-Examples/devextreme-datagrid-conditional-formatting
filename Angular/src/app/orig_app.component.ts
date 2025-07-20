import { Component } from '@angular/core';
import { Service, Order } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  title = 'Angular';
  orders: Order[];
  constructor(private service: Service) {
      this.orders = service.getOrders();
  }

  onCellPrepared(e) {
      if(e.rowType === 'data') {
          if(e.data.OrderDate < new Date(2014, 2, 3)) {
              e.cellElement.style.color = '#AAAAAA';
          }
          if(e.data.SaleAmount > 15000) {
              if(e.column.dataField === 'OrderNumber') {
                  e.cellElement.style.fontWeight = 'bold';
              }
              if(e.column.dataField === 'SaleAmount') {
                  e.cellElement.style.backgroundColor = '#FFBB00';
                  e.cellElement.style.color = '#000000';
              }
          }
      }

      if(e.rowType === 'group') {
          if(e.row.groupIndex === 0) {
              e.cellElement.style.backgroundColor = '#BEDFE6';
          }
          if(e.row.groupIndex === 1) {
              e.cellElement.style.backgroundColor = '#C9ECD7';
          }

          e.cellElement.style.color = '#000';
          if(e.cellElement.firstChild && e.cellElement.firstChild.style) {
            e.cellElement.firstChild.style.color = '#000';
          }
      }

      if(e.rowType === 'groupFooter' && e.column.dataField === 'SaleAmount') {
          e.cellElement.style.fontStyle = 'italic';
      }         
  }  
}
