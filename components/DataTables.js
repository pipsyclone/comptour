import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

const DataTables = (props) => {
    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px'
            },
        },
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Per page',
        rangeSeparatorText: "Dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua',
    }

    return (
        <DataTable
            columns={props.columns}
            data={props.dataArray}
            conditionalRowStyles={props.conditionalData}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
            dense
            subHeader
            subHeaderComponent={props.subHeaderComponentMemo}
        />
    )
}

export default DataTables;