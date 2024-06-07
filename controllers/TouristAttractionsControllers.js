import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Script from "@/assets/script";
import { useRouter } from "next/navigation";

const TouristAttractionsControllers = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    const { handleAlert } = Script()
    const router = useRouter()
    const baseURL = 'https://www.emsifa.com/api-wilayah-indonesia'

    const [data, setData] = useState([])
    const [dataProvinsi, setDataProvinsi] = useState([])
    const [dataKabupaten, setDataKabupaten] = useState([])
    const [dataKecamatan, setDataKecamatan] = useState([])
    const [taid, setTaid] = useState("")
    const [nameplace, setNamePlace] = useState("")
    const [image, setImage] = useState("")
    const [provinsi, setProvinsi] = useState({ id: '', name: '' })
    const [kabupaten, setKabupaten] = useState({ id: '', name: '' })
    const [kecamatan, setKecamatan] = useState({ id: '', name: '' })
    const [longtitude, setLongtitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [desc, setDesc] = useState("")

    const getProvinsi = async () => {
        await axios.get(baseURL + '/api/provinces.json')
            .then(res => {
                setDataProvinsi(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getKabupaten = async (provinceid) => {
        await axios.get(baseURL + '/api/regencies/' + provinceid + '.json')
            .then(res => {
                setDataKabupaten(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getKecamatan = async (regencyid) => {
        await axios.get(baseURL + '/api/districts/' + regencyid + '.json')
            .then(res => {
                setDataKecamatan(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleChangeProvince = async (e) => {
        const selectedId = e.target.value;
        await axios.get(baseURL + '/api/provinces.json')
            .then(res => {
                const selectedProvince = res.data.find(data => data.id === selectedId)
                setProvinsi({ id: selectedProvince.id, name: selectedProvince.name })
            })
    }

    const handleChangeRegency = async (e) => {
        const selectedId = e.target.value;
        await axios.get(baseURL + '/api/regencies/' + provinsi.id + '.json')
            .then(res => {
                const selectedRegency = res.data.find(data => data.id === selectedId)
                setKabupaten({ id: selectedRegency.id, name: selectedRegency.name })
            })
    }

    const handleChangeDistrict = async (e) => {
        const selectedId = e.target.value;
        await axios.get(baseURL + '/api/districts/' + kabupaten.id + '.json')
            .then(res => {
                const selectedDistrict = res.data.find(data => data.id === selectedId)
                setKecamatan({ id: selectedDistrict.id, name: selectedDistrict.name })
            })
    }

    const TAonSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (nameplace === "" || image === "" || provinsi === "" || kabupaten === "" || kecamatan === "" || longtitude === "" || latitude === "" || desc === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')
            setIsLoading(false)
        } else {
            await axios.post('/api/tourist-attractions/store', {
                userid: session.user.userid,
                nameplace: nameplace,
                image: image,
                province: provinsi.name,
                regency: kabupaten.name,
                district: kecamatan.name,
                longtitude: parseFloat(longtitude),
                latitude: parseFloat(latitude),
                desc: desc
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
                        setNamePlace("")
                        setImage("")
                        setLongtitude("")
                        setProvinsi("")
                        setKabupaten("")
                        setKecamatan("")
                        setLatitude("")
                        setDesc("")
                    }

                    setIsLoading(false)
                })
                .catch(err => {
                    handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                    console.log(err.message)
                    setIsLoading(false)
                })
        }
    }

    // Update Tourist Attractions
    const TAUpdateGetById = async (taid) => {
        await axios.post('/api/tourist-attractions/get-by-id', {
            taid: taid
        })
            .then(res => {
                setTaid(res.data.data.taid)
                setNamePlace(res.data.data.name_place)
                setLongtitude(res.data.data.longtitude)
                setLatitude(res.data.data.latitude)
                setDesc(res.data.data.description)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    const TAUpdate = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (nameplace === "" || longtitude === "" || latitude === "" || desc === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')
            setIsLoading(false)
        } else {
            await axios.put('/api/tourist-attractions/update', {
                taid: taid,
                nameplace: nameplace,
                image: image,
                province: provinsi.name,
                regency: kabupaten.name,
                district: kecamatan.name,
                longtitude: parseFloat(longtitude),
                latitude: parseFloat(latitude),
                desc: desc
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
                        router.push('/dashboard/tourist-attractions')
                    }

                    setIsLoading(false)
                })
                .catch(err => {
                    handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                    console.log(err.message)
                    setIsLoading(false)
                })
        }
    }

    // Get All Tourist Attractions
    const TAGetAll = async () => {
        await axios.post('/api/tourist-attractions/get-all')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    // Delete Tourist Attractions By ID
    const TADelete = async (taid) => {
        setIsLoading(true)
        await axios.delete('/api/tourist-attractions/delete?taid=' + taid)
            .then(res => {
                handleAlert('success', 'Proses Berhasil!', res.data.message)
                TAGetAll()
                setIsLoading(false)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
                setIsLoading(false)
            })
    }

    return {
        isLoading,
        dataProvinsi, dataKabupaten, dataKecamatan,
        data, setData, taid, setTaid, nameplace, setNamePlace, image, setImage, provinsi, setProvinsi, kabupaten, setKabupaten, kecamatan, setKecamatan, longtitude, setLongtitude, latitude, setLatitude, desc, setDesc,
        handleChangeProvince, handleChangeRegency, handleChangeDistrict,
        getProvinsi, getKabupaten, getKecamatan,
        TAonSubmit,
        TAGetAll,
        TAUpdateGetById, TAUpdate,
        TADelete
    }
}

export default TouristAttractionsControllers;