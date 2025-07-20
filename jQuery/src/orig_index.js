$(function(){
    function onCellPrepared(e) {
        if(e.rowType === "data") {
            if(e.data.OrderDate < new Date(2014, 2, 3)) {
                e.cellElement.css({ color: "#AAAAAA" });
            }
            if(e.data.SaleAmount > 15000) {
                if(e.column.dataField === "OrderNumber") {
                    e.cellElement.css({ "font-weight": "bold" });
                }
                if(e.column.dataField === "SaleAmount") {
                    e.cellElement.css({ "background-color": "#FFBB00", "color": "#000" });
                }
            }
        }

        if(e.rowType === "group") {
            if(e.row.groupIndex === 0) {
                e.cellElement.css({ "background-color": "#BEDFE6", "color": "#000" });
            }
            if(e.row.groupIndex === 1) {
                e.cellElement.css({ "background-color": "#C9ECD7", "color": "#000" });
            }
            e.cellElement.children().css({ "color": "#000" });
        }

        if(e.rowType === "groupFooter" && e.column.dataField === "SaleAmount") {
            e.cellElement.css({ "font-style": "italic" });
        }         
    }

    $("#gridContainer").dxDataGrid({
        dataSource: orders,
        showBorders: true,
        groupPanel: {
            visible: true
        },
        grouping: {
            autoExpandAll: true,
        },
        sortByGroupSummaryInfo: [{
            summaryItem: "count"
        }],
        columns: [
            {
                dataField: "Employee",
                groupIndex: 0,
            },
            {
                dataField: "OrderNumber",
                caption: "Invoice Number",
                width: 130,
            },
            {
                dataField: "OrderDate",
                dataType: "date",
                width: 160
            },
            {
                caption: "City",
                dataField: "CustomerStoreCity",
                groupIndex: 1
            },
            {
                caption: "State",
                dataField: "CustomerStoreState"  
            },
            {
                dataField: "SaleAmount",
                alignment: "right",
                format: "currency",
                sortOrder: "desc"
            }
        ],
        summary: {
            groupItems: [{
                column: "OrderNumber",
                summaryType: "count",
                displayFormat: "{0} orders",
            }, {
                column: "SaleAmount",
                summaryType: "max",
                displayFormat: "Max: {0}",
                valueFormat: "currency",
                alignByColumn: true,
                showInGroupFooter: false
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                displayFormat: "Sum: {0}",
                valueFormat: "currency",
                alignByColumn: true,
                showInGroupFooter: true
            }],

            totalItems: [{
                column: "SaleAmount",
                summaryType: "sum",
                displayFormat: "Total Sum: {0}",
                valueFormat: "currency"
            }]
        },

        onCellPrepared: onCellPrepared
    });
});
