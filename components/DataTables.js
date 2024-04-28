import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

const DataTables = () => {
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
    };

    const conditionalData = [
        {
            when: row => row.age >= 19,
            style: { color: "red" }
        },
        {
            when: row => row.age < 19,
            style: { color: "green" }
        }
    ]

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Nama Orang",
            selector: row => row.namaPerson
        },
        {
            name: "Alamat",
            selector: row => row.alamat
        },
        {
            name: "Umur",
            selector: row => row.age
        }
    ]

    const data = [
        {
            id: 1,
            namaPerson: "Apip Rahman Syahidan",
            alamat: "Andir",
            age: 18
        },
        {
            id: 2,
            namaPerson: "Abdul",
            alamat: "Jatiwangi",
            age: 19
        },
        {
            id: 3,
            namaPerson: "Rahmat",
            alamat: "Majalengka",
            age: 29
        },
        {
            id: 4,
            namaPerson: "Joni",
            alamat: "Cigasong",
            age: 20
        },
        {
            id: 5,
            namaPerson: "Jhonson",
            alamat: "Batak",
            age: 12
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item =>
            item.namaPerson && item.namaPerson.toLowerCase().includes(filterText.toLowerCase())
            ||
            item.alamat && item.alamat.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <div className="row gap">
                <input type="text" className="form-ctrl" placeholder="Cari Disini..." value={filterText} onChange={e => setFilterText(e.target.value)} />
                <button type="text" className="btn btn-primary" onClick={handleClear}>
                    Reset
                </button>
            </div>
        )
    }, [filterText, resetPaginationToggle]);

    const paginationComponentOptions = {
        rowsPerPageText: 'Per page',
        rangeSeparatorText: "Dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua',
    };

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            conditionalRowStyles={conditionalData}
            pagination
            // paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
            dense
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
        />
    )
}

export default DataTables;