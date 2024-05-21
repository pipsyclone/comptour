import DataTables from "@/components/DataTables";
import CommentsControllers from "@/controllers/CommentsControllers";
import { useState, useEffect, useMemo } from "react";

export default function CommentsComponent() {
    const {
        commentData,
        getAllComment
    } = CommentsControllers()

    useEffect(() => {
        getAllComment()
    }, [])

    const columns = [
        {
            name: 'TA ID',
            selector: row => row.taid
        },
        {
            name: 'Nama',
            selector: row => row.name
        },
        {
            name: 'Kontak',
            selector: row => row.contact
        },
        {
            name: 'Deskripsi',
            selector: row => row.description
        },
        {
            name: 'Waktu',
            selector: row => new Date(row.time).toDateString()
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredData = commentData.filter(
        item =>
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    )

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        }

        return (
            <div className="row gap">
                <input type="text" className="form-ctrl" placeholder="Cari Disini..." value={filterText} onChange={e => setFilterText(e.target.value)} />
                {/* <button type="text" className="btn btn-primary" onClick={handleClear}>
                    Reset
                </button> */}
            </div>
        )
    }, [filterText, resetPaginationToggle])

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Comments</span>
            </div>

            <div className="container">
                <div className="card">
                    <DataTables
                        columns={columns}
                        dataArray={filteredData}
                        conditionalData={false}
                        subHeaderComponentMemo={subHeaderComponentMemo}
                    />
                </div>
            </div>
        </>
    )
}