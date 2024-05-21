'use client'
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import CardStatistic from "@/components/CardStatistic";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import TouristAttractionsControllers from '@/controllers/TouristAttractionsControllers';
import { useSession } from 'next-auth/react';
import AuthControllers from '@/controllers/AuthControllers';
import BlogsControllers from '@/controllers/BlogsControllers';
import CommentsControllers from '@/controllers/CommentsControllers';

export default function HomeComponent() {
    const { data: session } = useSession()
    const { blogData, getAllBlog } = BlogsControllers()
    const { userData, USRGetAll } = AuthControllers()
    const { commentData, getAllComment } = CommentsControllers()
    const {
        data,
        TAGetAll
    } = TouristAttractionsControllers()

    const homeMarker = new L.Icon({
        iconUrl: '/images/home-marker.png',
        iconSize: [32, 32],
        iconAnchor: [32 / 2, 32],
    });

    const wisataMarker = new L.Icon({
        iconUrl: '/images/wisata-marker.png', // Path ke gambar marker custom
        iconSize: [32, 32], // Ukuran marker custom
        iconAnchor: [32 / 2, 32], // Anchor dari marker custom
    });

    const [myLocation, setMyLocation] = useState(null);
    useEffect(() => {
        USRGetAll()
        getAllBlog()
        getAllComment()

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMyLocation([latitude, longitude]);
                    TAGetAll()
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    return (
        <>
            {
                session?.user?.role === "ADMIN" ?
                    <>
                        <div className="bg-hero"></div>
                        <div className="container row-column gap-3 card-statistic-wrapper">
                            <CardStatistic statisticName="Tempat Wisata" solidIcon="fa-mountain-sun" data={data.length} dataFooter={"Jumlah lokasi tempat wisata yang anda unggah"} />
                            <CardStatistic statisticName="Komentar" solidIcon="fa-comments" data={commentData.length} dataFooter={"Jumlah komentar di beberapa tempat"} />
                            <CardStatistic statisticName="Blog" solidIcon="fa-blog" data={blogData.length} dataFooter={"Blog yang anda unggah"} />
                            <CardStatistic statisticName="Pengguna" solidIcon="fa-users" data={userData.length} dataFooter={"Pengguna yang terdaftar"} />
                        </div>
                    </>
                    : <div className='d-none'></div>
            }

            <div className="paths-wrapper">
                <span>Dashboard</span>
            </div>

            <div className="container row-column gap-3">
                <div className="card">
                    {
                        myLocation
                        &&
                        <MapContainer center={myLocation} zoom={5} scrollWheelZoom={true} style={{ width: '100%', height: '500px' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {
                                data.map((data, key) => {
                                    if (session?.user?.userid === data.userid) {
                                        return (
                                            <Marker position={[data?.longtitude, data?.latitude]} icon={wisataMarker} key={key}>
                                                <Popup>
                                                    <h3>{data.name_place}</h3>
                                                    {data.description}
                                                </Popup>
                                                <Tooltip>{data.name_place}</Tooltip>
                                            </Marker>
                                        )
                                    }
                                })
                            }
                            {
                                myLocation
                                &&
                                <Marker position={myLocation} icon={homeMarker}>
                                    <Tooltip>Kamu disini</Tooltip>
                                </Marker>
                            }
                        </MapContainer>
                    }
                </div>
            </div>
        </>
    )
}