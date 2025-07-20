<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="orders"
      :show-borders="true"
      @cell-prepared="cellPrepared"
    >

      <DxGroupPanel :visible="true"/>
      <DxGrouping :auto-expand-all="true"/>
      <DxSortByGroupSummaryInfo summary-item="count"/>

      <DxColumn
        :group-index="0"
        data-field="Employee"
      />
      <DxColumn
        :width="130"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <DxColumn
        :width="160"
        data-field="OrderDate"
        data-type="date"
      />
      <DxColumn
        :group-index="1"
        data-field="CustomerStoreCity"
        caption="City"
      />
      <DxColumn
        data-field="CustomerStoreState"
        caption="State"
      />
      <DxColumn
        data-field="SaleAmount"
        alignment="right"
        format="currency"
        sort-order="desc"
      />

      <DxSummary>
        <DxGroupItem
          :align-by-column="false"
          column="OrderNumber"
          summary-type="count"
          display-format="{0} orders"
        />
        <DxGroupItem
          :align-by-column="true"
          :show-in-group-footer="false"
          column="SaleAmount"
          summary-type="max"
          display-format="Max: {0}"
          value-format="currency"
        />
        <DxGroupItem
          :align-by-column="true"
          :show-in-group-footer="true"
          column="SaleAmount"
          summary-type="sum"
          display-format="Sum: {0}"
          value-format="currency"
        />

        <DxTotalItem
          column="SaleAmount"
          summary-type="sum"
          display-format="Total Sum: {0}"
          value-format="currency"
        />
      </DxSummary>
    </DxDataGrid>
  </div>
</template>

<script>

import {
  DxDataGrid,
  DxColumn,
  DxSummary,
  DxGroupPanel,
  DxGrouping,
  DxGroupItem,
  DxSortByGroupSummaryInfo,
  DxTotalItem
} from 'devextreme-vue/data-grid';
import service from './data.js';

export default {
  name: 'Home',
  components: {
    DxDataGrid,
    DxColumn,
    DxSummary,
    DxGroupPanel,
    DxGrouping,
    DxGroupItem,
    DxSortByGroupSummaryInfo,
    DxTotalItem
  },
  data() {
    return {
      orders: service.getOrders()
    };
  },
  methods: {
    cellPrepared(e) {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
