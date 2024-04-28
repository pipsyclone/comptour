'use client'
import '@/assets/globals.css';
import '@/assets/dashboard.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })
export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}