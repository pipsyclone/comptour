'use client'
import CulturesControllers from "@/controllers/CulturesControllers"
import TouristAttractionsControllers from "@/controllers/TouristAttractionsControllers"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function CulturesUpdateComponent() {

    const params = useParams()
    const {
        data,
        TAGetAll
    } = TouristAttractionsControllers()

    const {
        isLoading,
        taid, setTaid, nameImage, setNameImage, imageCulture, setImageCulture,
        getCulturesById,
        updateCultures,
    } = CulturesControllers()

    useEffect(() => {
        TAGetAll()
        getCulturesById(params.id)
    }, [])

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Tempat Wisata</span>
                /
                <span>Gambar Budaya</span>
                /
                <span>Perbarui Gambar Budaya</span>
            </div>

            <div className="container">
                <div className="card">
                    <form onSubmit={updateCultures} className="row-column gap-2">
                        <div className="row-column gap">
                            <label>Masukkan Gambar Budaya Untuk Tempat Wisata :</label>
                            <select className="form-ctrl" value={taid} onChange={(e) => setTaid(e.target.value)}>
                                <option value={""}>- Pilih Tempat Wisata -</option>
                                {
                                    data.map((data, key) => {
                                        return <option value={data.taid}>{data.name_place}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="row gap-3">
                            <div className="row-column gap flex-grow">
                                <label>Masukkan Nama Gambar :</label>
                                <input type="text" name="name_image" className="form-ctrl" value={nameImage} onChange={(e) => setNameImage(e.target.value)} />
                            </div>
                            <div className="row-column gap flex-grow">
                                <label>Masukkan URL Gambar :</label>
                                <input type="url" name="image_culture" className="form-ctrl" value={imageCulture} onChange={(e) => setImageCulture(e.target.value)} pattern="https?://.*" />
                            </div>
                        </div>

                        <div className="row gap-3 ms-auto">
                            <a href="/dashboard/tourist-attractions/cultures" className="btn btn-md btn-danger">Kembali</a>
                            <button type="submit" className={isLoading ? "btn btn-md btn-primary disabled" : "btn btn-md btn-primary"}>
                                {isLoading ? <div className="loader"></div> : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}