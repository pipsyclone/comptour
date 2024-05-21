import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Script from "@/assets/script";

const TouristAttractionsControllers = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    const { handleAlert } = Script()

    const [data, setData] = useState([])
    const [taid, setTaid] = useState("")
    const [nameplace, setNamePlace] = useState("")
    const [image, setImage] = useState("")
    const [longtitude, setLongtitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [desc, setDesc] = useState("")

    const TAonSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        if (nameplace === "" || image === "" || longtitude === "" || latitude === "" || desc === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')
            setIsLoading(false)
        } else {
            await axios.post('/api/tourist-attractions/store', {
                userid: session.user.userid,
                nameplace: nameplace,
                image: image,
                longtitude: parseFloat(longtitude),
                latitude: parseFloat(latitude),
                desc: desc
            }, { withCredentials: true })
                .then(res => {
                    if (res.data.status === 200) {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
                        setNamePlace("")
                        setImage("")
                        setLongtitude("")
                        setLatitude("")
                        setDesc("")
                    } else {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    }

                    setIsLoading(false)
                })
                .catch(err => {
                    handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
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
                setImage(res.data.data.image)
                setDesc(res.data.data.description)
                setLongtitude(res.data.data.longtitude)
                setLatitude(res.data.data.latitude)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
            })
    }

    const TAUpdate = async (e) => {
        e.preventDefault()

        await axios.put('/api/tourist-attractions/update', {
            taid: taid,
            nameplace: nameplace,
            image: image,
            desc: desc,
            longtitude: longtitude,
            latitude: latitude
        })
            .then(res => {
                if (res.data.status === 400 || res.data.status === 500) {
                    handleAlert('error', 'Proses Gagal!', res.data.message)
                } else {
                    handleAlert('success', 'Proses Gagal!', res.data.message)
                }
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
            })
    }

    // Get All Tourist Attractions
    const TAGetAll = async () => {
        await axios.post('/api/tourist-attractions/get-all')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
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
                setIsLoading(false)
            })
    }

    return {
        isLoading,
        data, setData, taid, setTaid, nameplace, setNamePlace, image, setImage, longtitude, setLongtitude, latitude, setLatitude, desc, setDesc,
        TAonSubmit,
        TAGetAll,
        TAUpdateGetById, TAUpdate,
        TADelete
    }
}

export default TouristAttractionsControllers;