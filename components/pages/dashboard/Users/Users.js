'use client'
import AuthControllers from "@/controllers/AuthControllers"
import DataTables from "@/components/DataTables"
import { useState, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"

export default function UsersComponent() {
    const { data: session } = useSession()
    const {
        userData,
        USRGetAll
    } = AuthControllers()

    useEffect(() => {
        USRGetAll()
    }, [])

    // Columns
    const columns = [
        {
            name: 'USER ID',
            selector: row => row.id
        },
        {
            name: 'Nama Pengguna',
            selector: row => row.name
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Role',
            selector: row => row.role
        }
    ]

    const conditionalData = [
        {
            when: row => row.userid === session?.user?.userid,
            style: { display: "none" }
        }
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredData = userData.filter(
        item =>
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            ||
            item.email && item.email.toLowerCase().includes(filterText.toLowerCase())
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
                <span>Users</span>
            </div>

            <div className="container">
                <div className="card">
                    <DataTables
                        columns={columns}
                        dataArray={filteredData}
                        conditionalData={conditionalData}
                        subHeaderComponentMemo={subHeaderComponentMemo}
                    />
                </div>
            </div>
        </>
    )
}