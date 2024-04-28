'use client'
import CardStatistic from "@/components/CardStatistic";
import DataTables from "@/components/DataTables";
import Script from "@/assets/script";

export default function HomeComponent() {
    const { handleAlert } = Script()
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
                    <h2>Komentar Hari Ini</h2>
                    <DataTables />
                </div>
            </div>
        </>
    )
}