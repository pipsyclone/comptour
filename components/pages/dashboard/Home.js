'use client'
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import CardStatistic from "@/components/CardStatistic";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import TouristAttractionsControllers from '@/controllers/TouristAttractionsControllers';

export default function HomeComponent() {
    const {
        data,
        TAGetAll
    } = TouristAttractionsControllers()

    const homeMarker = new L.Icon({
        iconUrl: '/images/home-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    const wisataMarker = new L.Icon({
        iconUrl: '/images/wisata-marker.png', // Path ke gambar marker custom
        iconSize: [32, 32], // Ukuran marker custom
        iconAnchor: [32 / 2, 32], // Anchor dari marker custom
    });

    const [myLocation, setMyLocation] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMyLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        TAGetAll()
    }, [])

    console.log(data.length)

    return (
        <>
            <div className="bg-hero"></div>
            <div className="container row-column gap-3 card-statistic-wrapper">
                <CardStatistic statisticName="Products" solidIcon="fa-boxes" data={233} dataFooter={5 + " Product Out of Stock"} />
                <CardStatistic statisticName="Income this Month" solidIcon="fa-coins" data={"Rp. 250.000"} dataFooter={"Estimate Rp. 1M Per Years"} />
                <CardStatistic statisticName="Deliver" solidIcon="fa-truck-ramp-box" data={29} dataFooter={11 + " Need Confirmation"} />
                <CardStatistic statisticName="Users" solidIcon="fa-users" data={11} dataFooter={7 + " Users Not Verified"} />
            </div>

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
                            {/* {
                                data.length < 1 ?
                                    ''
                                    :
                                    data.map((data, key) => {
                                        return (
                                            <Marker position={[data?.longtitude, data?.latitude]} icon={wisataMarker} key={key}>
                                                <Popup>
                                                    <h3>{data.name_place}</h3>
                                                    {data.description}
                                                </Popup>
                                                <Tooltip>{data.name_place}</Tooltip>
                                            </Marker>
                                        )
                                    })
                            } */}
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