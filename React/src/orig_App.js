import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';
import service from './data.js';

import { 
  DataGrid,
  GroupPanel,
  Grouping,
  SortByGroupSummaryInfo,
  Column,
  Summary,
  GroupItem,
  TotalItem
} from 'devextreme-react/data-grid';

const orders = service.getOrders();

const onCellPrepared = function(e) {
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

function App() {
  return (
    <div className="App">
      <DataGrid
          id="gridContainer"
          dataSource={orders}
          showBorders={true}
          onCellPrepared={onCellPrepared}
        >
          <GroupPanel visible={true} />
          <Grouping autoExpandAll={true} />
          <SortByGroupSummaryInfo summaryItem="count" />

          <Column dataField="Employee" groupIndex={0} />
          <Column dataField="OrderNumber" caption="Invoice Number" width={130} />
          <Column dataField="OrderDate" dataType="date" width={160} />
          <Column dataField="CustomerStoreCity" caption="City" groupIndex={1} />
          <Column dataField="CustomerStoreState" caption="State" />
          <Column dataField="SaleAmount" alignment="right" format="currency" sortOrder="desc" />

          <Summary>
            <GroupItem
              column="OrderNumber"
              summaryType="count"
              displayFormat="{0} orders"
              alignByColumn={false} 
            />
            <GroupItem
              column="SaleAmount"
              summaryType="max"
              displayFormat="Max: {0}"
              valueFormat="currency"
              alignByColumn={true}
              showInGroupFooter={false} 
            />
            <GroupItem
              column="SaleAmount"
              summaryType="sum"
              displayFormat="Sum: {0}"
              valueFormat="currency"
              alignByColumn={true}
              showInGroupFooter={true} 
            />
            <TotalItem
              column="SaleAmount"
              summaryType="sum"
              displayFormat="Total Sum: {0}"
              valueFormat="currency" 
            />
          </Summary>
        </DataGrid>
    </div>
  );
}

export default App;
