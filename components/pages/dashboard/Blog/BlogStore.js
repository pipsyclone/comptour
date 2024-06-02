'use client'
import BlogsControllers from "@/controllers/BlogsControllers"

export default function BlogStoreComponent() {

    const {
        isLoading,
        image, setImage, title, setTitle, desc, setDesc,
        storeBlog,
    } = BlogsControllers()

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Blog</span>
                /
                <span>Tambah Blog</span>
            </div>

            <div className="container">
                <div className="card">
                    <form onSubmit={storeBlog} className="row-column gap-3">
                        <div className="row-column gap">
                            <label>Masukkan ID Gambar : </label>
                            <input type="text" name="image" className="form-ctrl" value={image} onChange={(e) => setImage(e.target.value)} placeholder="example : 1xpdoNh_O0C-rkjUcUFZAVSQTaGK1eV5u" />
                        </div>
                        <div className="row-column gap">
                            <label>Masukkan Judul Blog : </label>
                            <input type="text" name="title" className="form-ctrl" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="row-column gap">
                            <label>Deskripsi : </label>
                            <textarea name="description" className="form-ctrl" rows={7} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <div className="row gap-3 ms-auto">
                            <a href="/dashboard/blog" className="btn btn-danger">Kembali</a>
                            <button type="submit" className={isLoading ? "btn btn-primary disabled" : "btn btn-primary"}>
                                {isLoading ? <div className="loader"></div> : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}