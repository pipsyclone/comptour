const { default: Script } = require("@/assets/script")
const { default: axios } = require("axios")
const { useState } = require("react")

const CulturesControllers = () => {

    const { handleAlert } = Script()
    const [isLoading, setIsLoading] = useState(false)

    const [culturesData, setCulturesData] = useState([])
    const [id, setId] = useState("")
    const [taid, setTaid] = useState("")
    const [nameImage, setNameImage] = useState("")
    const [imageCulture, setImageCulture] = useState("")

    const getAllCultures = async () => {
        await axios.post('/api/cultures/get-all')
            .then(res => {
                setCulturesData(res.data.data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    const getCulturesById = async (id) => {
        await axios.post('/api/cultures/get-by-id?id=' + id)
            .then(res => {
                setId(id)
                setTaid(res.data.data.taid)
                setNameImage(res.data.data.name_image)
                setImageCulture(res.data.data.image)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    const storeCultures = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (taid === "" || nameImage === "" || imageCulture === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali')
            setIsLoading(false)
        } else {
            await axios.post('/api/cultures/store', {
                taid: taid,
                name_image: nameImage,
                image_culture: imageCulture
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)

                        setTaid("")
                        setNameImage("")
                        setImageCulture("")
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

    const updateCultures = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (taid === "" || nameImage === "" || imageCulture === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali')
            setIsLoading(false)
        } else {
            await axios.put('/api/cultures/update', {
                id: id,
                taid: taid,
                name_image: nameImage,
                image_culture: imageCulture
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
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

    const deleteCultures = async (id) => {
        setIsLoading(true)
        await axios.delete('/api/cultures/delete?id=' + id)
            .then(res => {
                if (res.data.status >= 400) {
                    handleAlert('error', 'Proses Gagal!', res.data.message)
                } else {
                    handleAlert('success', 'Proses Berhasil!', res.data.message)
                }

                getAllCultures()
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
        culturesData, setCulturesData, id, setId, taid, setTaid, nameImage, setNameImage, imageCulture, setImageCulture,
        getAllCultures,
        getCulturesById,
        storeCultures,
        updateCultures,
        deleteCultures
    }
}

export default CulturesControllers;