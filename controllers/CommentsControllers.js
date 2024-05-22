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

    return {
        isLoading,
        commentData, setCommentData,
        getAllComment
    }
}

export default CommentsControllers;