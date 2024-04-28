'use client'
import Image from "next/image";
import imageUser from "@/assets/image/user.png"
import Link from "next/link";

import { useSession } from "next-auth/react";

const TopBar = (props) => {
    const { data: session } = useSession()
    return (
        <nav className="topbar">
            <button type="button" className="btn-sidebar-toggle cursor-pointer" onClick={props.onClickSidebarShow}>
                <i className="fa-solid fa-bars"></i>
            </button>

            <ul className="topbar-list">
                <li className="topbar-item">
                    <Link href={'/dashboard/settings'} className="topbar-link topbar-profile">
                        <Image src={imageUser} width={25} alt="User Image" />
                        Hi, {session?.user?.name}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default TopBar;