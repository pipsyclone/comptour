import dynamic from "next/dynamic"

export const metadata = {
    title: 'Welcome to Dashboard Comptour'
}

const HomeComponent = dynamic(() => import("@/components/pages/dashboard/Home"), { ssr: false })
export default function Dashboard() {
    return (<HomeComponent />)
}