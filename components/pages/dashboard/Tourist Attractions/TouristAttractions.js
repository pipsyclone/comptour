'use client'
import { useState, useMemo, useEffect } from "react";
import DataTables from "@/components/DataTables";
import TouristAttractionsControllers from "@/controllers/TouristAttractionsControllers";
import { useSession } from "next-auth/react";

export default function TouristAttractionsComponent() {
    const { data: session } = useSession()
    const {
        isLoading,
        data,
        TAGetAll,
        TADelete
    } = TouristAttractionsControllers()

    useEffect(() => {
        TAGetAll()
    }, [])

    const columns = [
        {
            name: "ID",
            selector: row => row.taid,
            // sortable: true
        },
        {
            name: "Gambar",
            selector: row => row.image
        },
        {
            name: "Nama Tempat Wisata",
            selector: row => row.name_place
        },
        {
            name: "Longititude",
            selector: row => row.longtitude
        },
        {
            name: "Latitude",
            selector: row => row.latitude
        },
        {
            name: "Aksi",
            selector: row => (
                <div className="row gap">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => window.location.href = '/dashboard/tourist-attractions/update/' + row.taid}>Edit</button>
                    <button type="button" className={isLoading ? "btn btn-sm btn-danger disabled" : "btn btn-sm btn-danger"} onClick={() => TADelete(row.taid)}>
                        {isLoading ? <div className="loader"></div> : 'Hapus'}
                    </button>
                </div>
            ),
            style: { padding: '5px' }
        }
    ]

    const conditionalData = [
        {
            when: row => row.userid !== session?.user?.userid && session?.user?.role === 'USER',
            style: { display: "none" }
        }
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredData = data.filter(
        item =>
            item.name_place && item.name_place.toLowerCase().includes(filterText.toLowerCase())
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
                <span>Tempat Wisata</span>
            </div>

            <div className="container">
                <div className="card">
                    <div className="row space-between mb-3">
                        <div className="row gap">
                            <a href="/dashboard/tourist-attractions/store" className="btn btn-primary">Tambah Tempat Wisata</a>
                            <a href="/dashboard/tourist-attractions/store/culture" className="btn btn-primary">Tambah Gambar Budaya</a>
                        </div>
                    </div>
                    <hr />
                    {
                        <DataTables
                            columns={columns}
                            dataArray={filteredData}
                            conditionalData={conditionalData}
                            subHeaderComponentMemo={subHeaderComponentMemo}
                        />
                    }
                </div>
            </div>
        </>
    )
}