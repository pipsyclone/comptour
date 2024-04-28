'use client'

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SettingsComponent() {
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
                        SecurityCard()
                        :
                        menu === 'account' ?
                            AccountCard()
                            :
                            ProfileCard()
                }
            </div>
        </>
    )
}

const ProfileCard = () => {
    return (
        <div className="card row-column flex-grow-3 align-md-self-start gap-2">
            <h2>Profile</h2>
            <hr />
            <input type="text" className="form-ctrl" placeholder="Jhon Doe" />
            <input type="email" className="form-ctrl" placeholder="example@mail.com" />
            <textarea rows={7} className="form-ctrl" placeholder="Bio"></textarea>
            <div className="align-self-end">
                <button type="button" className="btn btn-success">Save Change</button>
            </div>
        </div>
    )
}

const SecurityCard = () => {
    return (
        <div className="card row-column flex-grow-3 align-md-self-start gap-2">
            <h2>Security</h2>
            <hr />
            <input type="text" className="form-ctrl" placeholder="New Password" />
            <input type="password" className="form-ctrl" placeholder="Confirm Password" />
            <div className="align-self-end">
                <button type="button" className="btn btn-success">Save Change</button>
            </div>
        </div>
    )
}

const AccountCard = () => {
    return (
        <div className="card row-column flex-grow-3 align-md-self-start gap-2">
            <h2>Account</h2>
            <hr />
            <div>
                <button type="button" onClick={() => signOut()} className="btn btn-danger">Logout</button>
            </div>
        </div>
    )
}