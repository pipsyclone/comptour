'use client'
import '@/assets/globals.css';
import '@/assets/dashboard.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })
export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel='icon' type='icon/png' href='./../../assets/image/favicon.png' />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}