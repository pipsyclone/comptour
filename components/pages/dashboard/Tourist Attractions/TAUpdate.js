'use client'
import TouristAttractionsControllers from "@/controllers/TouristAttractionsControllers"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function TAUpdateComponent() {
    const params = useParams()
    const {
        isLoading,
        taid, nameplace, setNamePlace, image, setImage, longtitude, setLongtitude, latitude, setLatitude, desc, setDesc,
        TAUpdateGetById, TAUpdate

    } = TouristAttractionsControllers()

    useEffect(() => {
        TAUpdateGetById(params.taid)
    }, [])

    return (
        <div className="container">
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Tempat Wisata</span>
                /
                <span>Perbarui Tempat Wisata</span>
            </div>
            <div className="card">
                <form onSubmit={TAUpdate} className="row-column gap-3">
                    <input type="text" name="taid" value={taid} readOnly hidden />
                    <div className="row-column">
                        <label>Nama Tempat Wisata : </label>
                        <input type="text" name="nameplace" className="form-ctrl" value={nameplace} onChange={(e) => setNamePlace(e.target.value)} />
                    </div>
                    <div className="row-column">
                        <label>Tautan Gambar Tempat Wisata : </label>
                        <input type="url" name="image" className="form-ctrl" value={image} onChange={(e) => setImage(e.target.value)} pattern="https?://.*" />
                    </div>
                    <div className="row row-md gap-2">
                        <div className="row-column flex-grow">
                            <label>Longtitude : </label>
                            <input type="number" name="longtitude" className="form-ctrl" value={longtitude} onChange={(e) => setLongtitude(e.target.value)} />
                        </div>
                        <div className="row-column flex-grow">
                            <label>Latitude : </label>
                            <input type="number" name="latitude" className="form-ctrl" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                    </div>
                    <div className="row-column">
                        <label>Deskripsi Tempat Wisata : </label>
                        <textarea type="text" name="desc" rows={7} className="form-ctrl" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>

                    <div className="row gap-3 ms-auto">
                        <a href="/dashboard/tourist-attractions" className="btn btn-md btn-danger">Kembali</a>
                        <button type="submit" className={isLoading ? "btn btn-md btn-primary disabled" : "btn btn-md btn-primary"}>
                            {isLoading ? <div className="loader"></div> : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}