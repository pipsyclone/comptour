'use client'

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import UsersControllers from "@/controllers/UsersControllers";

export default function SettingsComponent() {
    const {
        isLoading,
        name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
        updateUser,
        updatePasswords
    } = UsersControllers()

    const [menu, setMenu] = useState('profile')
    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Settings</span>
            </div>
            <div className="container row-md gap-3">
                <div className="card row-column flex-grow gap-2 align-md-self-start">
                    <button type="button" className="btn btn-light" onClick={() => setMenu('profile')}>Profile</button>
                    <button type="button" className="btn btn-light" onClick={() => setMenu('security')}>Security</button>
                    <button type="button" className="btn btn-light" onClick={() => setMenu('account')}>Account</button>
                </div>
                {
                    menu === 'security' ?
                        <div className="card flex-grow-3 align-md-self-start">
                            <h2>Security</h2>
                            <br />
                            <hr />
                            <br />
                            <form onSubmit={updatePasswords} className="row-column gap">
                                <div className="row gap-2">
                                    <input type="password" className="form-ctrl flex-grow" placeholder="Kata Sandi Baru" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input type="password" className="form-ctrl flex-grow" placeholder="Konfirmasi Kata Sandi" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="align-self-end">
                                    <button type="submit" className={isLoading ? "btn btn-success disabled" : "btn btn-success"}>
                                        {isLoading ? <div className="loader"></div> : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        :
                        menu === 'account' ?
                            <div className="card row-column flex-grow-3 align-md-self-start gap-2">
                                <h2>Account</h2>
                                <hr />
                                <div>
                                    <button type="button" onClick={() => signOut()} className="btn btn-danger">Logout</button>
                                </div>
                            </div>
                            :
                            <div className="card flex-grow-3 align-md-self-start">
                                <h2>Profile</h2>
                                <br />
                                <hr />
                                <br />
                                <form onSubmit={updateUser} className="row-column gap">
                                    <div className="row-column gap">
                                        <label>Nama Lengkap : </label>
                                        <input type="text" className="form-ctrl" placeholder="Jhon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="row-column gap">
                                        <label>Email : </label>
                                        <input type="email" className="form-ctrl" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="align-self-end">
                                        <button type="submit" className={isLoading ? "btn btn-success disabled" : "btn btn-success"}>
                                            {isLoading ? <div className="loader"></div> : 'Simpan Perubahan'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                }
            </div>
        </>
    )
}