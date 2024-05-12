import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Script from "@/assets/script";

const TouristAttractionsControllers = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()
    const { handleAlert } = Script()

    const [data, setData] = useState([])
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

    // Get All Tourist Attractions
    const TAGetAll = async () => {
        await axios.get('/api/tourist-attractions/get-all', { withCredentials: true })
            .then(res => {
                setData(res.data.data)
                console.log(res)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
            })
    }

    // Delete Tourist Attractions By ID
    const TADelete = async (taid) => {
        setIsLoading(true)
        await axios.delete('/api/tourist-attractions/delete?taid=' + taid, { withCredentials: true })
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
        data, setData, nameplace, setNamePlace, image, setImage, longtitude, setLongtitude, latitude, setLatitude, desc, setDesc,
        TAonSubmit,
        TAGetAll,
        TADelete
    }
}

export default TouristAttractionsControllers;