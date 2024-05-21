'use client'
import { useState, useMemo } from "react";
import DataTables from "@/components/DataTables";
import BlogsControllers from "@/controllers/BlogsControllers";
import { useSession } from "next-auth/react";

export default function BlogComponent() {
    const { data: session } = useSession()
    const {
        isLoading,
        blogData,
        getAllBlog,
        deleteBlog
    } = BlogsControllers()

    useState(() => {
        getAllBlog()
    }, [])

    // Columns
    const columns = [
        {
            name: 'Blog ID',
            selector: row => row.blogid
        },
        {
            name: 'Gambar',
            selector: row => row.image
        },
        {
            name: 'Judul',
            selector: row => row.title
        },
        {
            name: 'Aksi',
            selector: row => (
                <div className="row gap">
                    <a href={"/dashboard/blog/update/" + row.blogid} className="btn btn-sm btn-primary">Edit</a>
                    <button type="button" className={isLoading ? "btn btn-sm btn-danger disabled" : "btn btn-sm btn-danger"} onClick={() => deleteBlog(row.blogid)}>
                        {isLoading ? <div className="loader"></div> : 'Hapus'}
                    </button>
                </div>
            ),
            style: { padding: '5px' }
        },
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredData = blogData.filter(
        item =>
            item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
            ||
            item.description && item.description.toLowerCase().includes(filterText.toLowerCase())
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

    const conditionalData = [
        {
            when: row => row.userid === session?.user?.userid && session?.user?.role === 'USER',
            style: { display: 'none' }
        }
    ]

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Blog</span>
            </div>

            <div className="container">
                <div className="card">
                    <div className="row space-between mb-3">
                        <a href="/dashboard/blog/store" className="btn btn-primary">Tambah Blog</a>
                    </div>

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