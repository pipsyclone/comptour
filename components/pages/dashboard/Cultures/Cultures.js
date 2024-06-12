'use client'
import { useState, useEffect, useMemo } from "react"
import DataTables from "@/components/DataTables"
import { useSession } from "next-auth/react"
import CulturesControllers from "@/controllers/CulturesControllers"
import Image from "next/image"

export default function CulturesComponent() {

    const { data: session } = useSession()
    const {
        isLoading,
        culturesData,
        getAllCultures,
        deleteCultures
    } = CulturesControllers()

    useEffect(() => {
        getAllCultures()
    }, [])

    const columns = [
        {
            name: 'TAID',
            selector: row => row.taid
        },
        {
            name: 'Gambar',
            selector: row => (
                <Image src={row.image} alt={row.name_image} width={200} height={100} />
            )
        },
        {
            name: 'Nama Gambar',
            selector: row => row.name_image
        },
        {
            name: 'Aksi',
            selector: row => (
                <div className="row gap">
                    <a href={"/dashboard/tourist-attractions/cultures/update/" + row.id} className="btn btn-sm btn-primary">Edit</a>
                    <button type="button" className={isLoading && row.id ? "btn btn-sm btn-danger disabled" : "btn btn-sm btn-danger"} onClick={() => deleteCultures(row.id)}>
                        {isLoading ? <div className="loader"></div> : 'Delete'}
                    </button>
                </div>
            )
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
    const filteredData = culturesData.filter(
        item =>
            item.name_image && item.name_image.toLowerCase().includes(filterText.toLowerCase())
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
                /
                <span>Gambar Budaya</span>
            </div>

            <div className="container">
                <div className="card">
                    <div className="row gap space-between mb-3">
                        <a href="/dashboard/tourist-attractions" className="btn btn-primary">Tempat Wisata</a>
                        <a href="/dashboard/tourist-attractions/cultures/store" className="btn btn-primary">Tambah Gambar Budaya</a>
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