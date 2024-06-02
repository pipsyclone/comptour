import axios from "axios";
import { useSession } from "next-auth/react";
import Script from "@/assets/script";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BlogsControllers = () => {
    const { data: session } = useSession()
    const { handleAlert } = Script()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [blogData, setBlogData] = useState([])
    const [blogid, setBlogId] = useState("")
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    // Get All
    const getAllBlog = async () => {
        await axios.post('/api/blogs/get-all')
            .then(res => {
                setBlogData(res.data.data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    // Get By Id
    const getBlogById = async (blogid) => {
        await axios.post('/api/blogs/get-by-id', {
            blogid: blogid
        })
            .then(res => {
                const data = res.data.data
                setBlogId(data.blogid)
                setTitle(data.title)
                setDesc(data.description)
                console.log(data)
            })
            .catch(err => {
                handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                console.log(err.message)
            })
    }

    // Store
    const storeBlog = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (image === "" || title === "" || desc === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')

            setIsLoading(false)
        } else {
            await axios.post('/api/blogs/store', {
                userid: session?.user?.userid,
                image: image,
                title: title,
                desc: desc
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil', res.data.message)
                    }

                    setImage("")
                    setTitle("")
                    setDesc("")
                    setIsLoading(false)
                })
                .catch(err => {
                    handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                    console.log(err.message)

                    setIsLoading(false)
                })
        }
    }

    // Update
    const updateBlog = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (title === "" || desc === "") {
            handleAlert('error', 'Proses Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')

            setIsLoading(false)
        } else {
            await axios.put('/api/blogs/update', {
                blogid: blogid,
                image: image,
                title: title,
                desc: desc
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
                        router.push('/dashboard/blog')
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

    // Delete
    const deleteBlog = async (blogid) => {
        setIsLoading(true)
        await axios.delete('/api/blogs/delete?blogid=' + blogid)
            .then(res => {
                if (res.data.status === 400 || res.data.status === 500) {
                    handleAlert('error', 'Proses Gagal!', res.data.message)
                } else {
                    handleAlert('success', 'Proses Berhasil', res.data.message)
                }

                getAllBlog()
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
        blogData, setBlogData, blogid, setBlogId, image, setImage, title, setTitle, desc, setDesc,
        getAllBlog,
        getBlogById,
        storeBlog,
        updateBlog,
        deleteBlog
    }
}

export default BlogsControllers;