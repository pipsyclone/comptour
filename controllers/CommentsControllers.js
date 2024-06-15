const { default: Script } = require("@/assets/script")
const { default: axios } = require("axios")
const { useState } = require("react")

const CommentsControllers = () => {
    const { handleAlert } = Script()
    const [isLoading, setIsLoading] = useState(false)
    const [commentData, setCommentData] = useState([])

    const getAllComment = async () => {
        await axios.post('/api/comments/get-all')
            .then(res => {
                setCommentData(res.data.data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    const deleteAllComment = async () => {
        await axios.delete('/api/comments/reset')
            .then(res => {
                if (res.data.status === 200) {
                    handleAlert('success', 'Proses Berhasil!', res.data.message)
                }

                getAllComment()
                console.log(res.data.message)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    return {
        isLoading,
        commentData, setCommentData,
        getAllComment,
        deleteAllComment
    }
}

export default CommentsControllers;