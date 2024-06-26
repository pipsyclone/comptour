import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "@/assets/image/logo-full.png"

const Sidebar = (props) => {
    const { data: session } = useSession()
    return (
        <>
            {
                props.sidebarShow ?
                    ''
                    :
                    <div className="background-sidebar"></div>
            }

            <aside className={props.sidebarShow ? 'sidebar-desktop' : 'sidebar-responsive'}>
                {/* <h3 className="nav-title">CompTour</h3> */}
                <Image src={Logo} className='nav-title' alt="Logo Comptour" width={150} height={0} />
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <i className="fa-solid fa-tachometer-alt"></i>
                            Dashboard
                        </a>
                    </li>
                    <p className="nav-subtitle">Wisata</p>
                    <li className="nav-item">
                        <a href="/dashboard/tourist-attractions" className="nav-link">
                            <i className="fa-solid fa-map-location-dot"></i>
                            Tempat Wisata
                        </a>
                    </li>
                    {
                        session && session.user.role === "ADMIN" && (
                            <li className="nav-item">
                                <a href="/dashboard/comments" className="nav-link">
                                    <i className="fa-solid fa-comments"></i>
                                    Komentar
                                </a>
                            </li>
                        )
                    }
                    <li className="nav-item">
                        <a href="/dashboard/blog" className="nav-link">
                            <i className="fa-solid fa-newspaper"></i>
                            Blog
                        </a>
                    </li>
                    {
                        session && session.user.role === "ADMIN" && (
                            <>
                                <p className="nav-subtitle">Users</p>
                                <li className="nav-item">
                                    <a href="/dashboard/users" className="nav-link">
                                        <i className="fa-solid fa-users"></i>
                                        Users
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/dashboard/register" className="nav-link">
                                        <i className="fa-solid fa-user-plus"></i>
                                        Register
                                    </a>
                                </li>
                            </>
                        )

                    }
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={props.onClickSidebarShow}>
                            <i className="fa-solid fa-times"></i>
                            Close
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;