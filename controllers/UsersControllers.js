import Script from "@/assets/script";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const UsersControllers = () => {
    const { data: session } = useSession()
    const { handleAlert, handleConfirmLogoutAlert } = Script()
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updateUser = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (name === "") {
            handleAlert('error', 'Proses Gagal!', 'Form nama tidak boleh kosong!')
            setIsLoading(false)
        } else {
            await axios.put('/api/users/update', {
                userid: session?.user?.userid,
                name: name,
                email: email
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        handleConfirmLogoutAlert('success', 'Proses Berhasil', 'Silahkan login kembali, untuk melihat perubahan!', false, 'Logout')
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

    // New Password
    const updatePasswords = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        if (password === "" || confirmPassword === "") {
            handleAlert('error', 'Proses Gagal!', 'Form tidak boleh kosong!')
            setIsLoading(false)
        } else if (confirmPassword !== password) {
            handleAlert('error', 'Proses Gagal!', 'Konfirmasi kata sandi harus sama dengan kata sandi!')
            setIsLoading(false)
        } else {
            await axios.put('/api/users/new-password', {
                userid: session?.user?.userid,
                confirmPassword: confirmPassword
            })
                .then(res => {
                    if (res.data.status >= 400) {
                        handleAlert('error', 'Proses Gagal!', res.data.message)
                    } else {
                        signOut()
                    }

                    setIsLoading(false)
                })
                .catch(err => {
                    handleAlert('error', 'Proses Gagal!', 'Server gagal memproses!')
                    console.log(err.message)
                    setIsLoading(falses)
                })
        }
    }

    return {
        isLoading,
        name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
        updateUser,
        updatePasswords
    }
}

export default UsersControllers;