'use client'
import TouristAttractionsControllers from "@/controllers/TouristAttractionsControllers"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function TAUpdateComponent() {
    const params = useParams()
    const {
        isLoading,
        dataProvinsi, dataKabupaten, dataKecamatan,
        taid, nameplace, setNamePlace, image, setImage, provinsi, kabupaten, kecamatan, longtitude, setLongtitude, latitude, setLatitude, desc, setDesc,
        handleChangeProvince, handleChangeRegency, handleChangeDistrict,
        getProvinsi, getKabupaten, getKecamatan,
        TAUpdateGetById, TAUpdate

    } = TouristAttractionsControllers()

    useEffect(() => {
        TAUpdateGetById(params.taid)
    }, [])

    useEffect(() => {
        getProvinsi()
        if (provinsi.id !== "") {
            getKabupaten(provinsi.id)
        }

        if (kabupaten.id !== "") {
            getKecamatan(kabupaten.id)
        }
    }, [provinsi, kabupaten, kecamatan])

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
                        <label>Nama Tempat Wisata : <span className="text-danger">*</span></label>
                        <input type="text" name="nameplace" className="form-ctrl" value={nameplace} onChange={(e) => setNamePlace(e.target.value)} />
                    </div>
                    <div className="row-column">
                        <label>Gambar ID Tempat Wisata : </label>
                        <input type="text" name="image" className="form-ctrl" value={image} onChange={(e) => setImage(e.target.value)} placeholder="example : 1xpdoNh_O0C-rkjUcUFZAVSQTaGK1eV5u" />
                    </div>
                    <hr />
                    <div className="row row-md gap-3">
                        <div className="row-column flex-grow">
                            <label>Provinsi : </label>
                            <select className="form-ctrl" value={provinsi.id} onChange={handleChangeProvince}>
                                <option value={''}>- Pilih Provinsi -</option>
                                {
                                    dataProvinsi.sort((a, b) => a.name.localeCompare(b.name)).map((data, key) => {
                                        return <option value={data.id} key={key}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="row-column flex-grow">
                            <label>Kabupaten : </label>
                            <select className="form-ctrl" value={kabupaten.id} onChange={handleChangeRegency} disabled={provinsi.id === "" ? true : false}>
                                <option value={""}>- Pilih Kabupaten -</option>
                                {
                                    dataKabupaten.sort((a, b) => a.name.localeCompare(b.name)).map((data, key) => {
                                        return <option value={data.id} key={key}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="row-column flex-grow">
                            <label>Kecamatan : </label>
                            <select className="form-ctrl" value={kecamatan.id} onChange={handleChangeDistrict} disabled={kabupaten.id === "" ? true : false}>
                                <option value={""}>- Pilih Kecamatan -</option>
                                {
                                    dataKecamatan.sort((a, b) => a.name.localeCompare(b.name)).map((data, key) => {
                                        return <option value={data.id} key={key}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row row-md gap-2">
                        <div className="row-column flex-grow">
                            <label>Longtitude : <span className="text-danger">*</span></label>
                            <input type="number" name="longtitude" className="form-ctrl" value={longtitude} onChange={(e) => setLongtitude(e.target.value)} />
                        </div>
                        <div className="row-column flex-grow">
                            <label>Latitude : <span className="text-danger">*</span></label>
                            <input type="number" name="latitude" className="form-ctrl" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                    </div>
                    <div className="row-column">
                        <label>Deskripsi Tempat Wisata : <span className="text-danger">*</span></label>
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