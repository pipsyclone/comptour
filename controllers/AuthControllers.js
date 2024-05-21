'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import Script from "@/assets/script"
import axios from "axios"

const AuthControllers = () => {
    const { handleAlert } = Script()
    const [isLoading, setIsLoading] = useState(false)

    const [userData, setUserData] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")

    const USRGetAll = async () => {
        await axios.get('/api/users/get-all')
            .then(res => {
                setUserData(res.data.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const HandleSignIn = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (email === "" || password === "") {
            handleAlert('error', 'Masukkan Gagal!', 'Masih ada form yang kosong, silahkan periksan kembali!')
            setIsLoading(false)
        } else {
            signIn('credentials', { email, password, redirect: false })
                .then(async res => {
                    if (res.error) {
                        handleAlert('error', 'Autentikasi Gagal!', 'Email atau password anda tidak sesuai!')
                    } else window.location.href = '/dashboard'

                    setIsLoading(false)
                })
        }
    }

    const HandleSignUp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (name === "" || email === "" || password === "" || confirmPassword === "" || role === "") {
            handleAlert('error', 'Masukkan Gagal!', 'Masih ada form yang kosong, silahkan periksa kembali!')
            setIsLoading(false)
        } else if (password !== confirmPassword) {
            handleAlert('error', 'Kata Sandi Gagal!', 'Kata sandi anda tidak sama, silahkan coba lagi!')
            setIsLoading(false)
        } else {
            await axios.post('/api/auth/signup', {
                name: name,
                email: email,
                password: confirmPassword,
                role: role
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        handleAlert('success', 'Proses Berhasil!', res.data.message)
                        setName("")
                        setEmail("")
                        setPassword("")
                        setConfirmPassword("")
                        setRole("")
                    } else {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    }

                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setIsLoading(false)
                })
        }
    }

    return {
        isLoading,
        userData, setUserData, name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, role, setRole,
        USRGetAll,
        HandleSignIn,
        HandleSignUp
    }
}

export default AuthControllers;