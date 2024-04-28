'use client'
import Logo from "@/assets/image/logo.png";
import Image from "next/image";
import AuthControllers from "@/controllers/AuthControllers";
import { useState } from "react";

const SignUpComponent = () => {
    const {
        isLoading,
        name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, role, setRole,
        HandleSignUp
    } = AuthControllers()

    const [isShowPass, setIsShowPass] = useState(false)
    return (
        <div className="card mx-auto mt-3 row-column gap-3 w-50">
            <Image src={Logo} alt="Logo Comptour" className="align-center" width={200} height={0} />
            <hr />
            <form onSubmit={HandleSignUp} className="row-column gap-3">
                <select className="form-ctrl" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value={""}>- Pilih Role Pengguna -</option>
                    <option value={"USER"}>USER</option>
                    <option value={"ADMIN"}>ADMIN</option>
                </select>
                <div className="row-column">
                    <label>Nama</label>
                    <input type="text" className="form-ctrl" placeholder="Jhon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="row-column">
                    <label>Email</label>
                    <input type="email" className="form-ctrl" placeholder="jhondoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="row-column gap-2">
                    <div className="row row-md gap-3 w-100">
                        <div className="w-50 flex-grow">
                            <label>Kata Sandi</label>
                            <br />
                            <input type={isShowPass ? "text" : "password"} className="form-ctrl" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="w-50 flex-grow">
                            <label>Komfirmasi Kata Sandi</label>
                            <br />
                            <input type={isShowPass ? "text" : "password"} className="form-ctrl" placeholder="******" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" value={isShowPass} onChange={() => setIsShowPass(!isShowPass)} id="showPassword" />
                        <label htmlFor="showPassword"> Show Password</label>
                    </div>
                </div>
                <button type="submit" className={isLoading ? "btn btn-success disabled" : "btn btn-success"}>
                    {isLoading ? <div className="loader"></div> : "Register"}
                </button>
            </form>
        </div>
    )
}

export default SignUpComponent;