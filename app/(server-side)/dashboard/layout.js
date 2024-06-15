'use client'
import '@/assets/globals.css';
import '@/assets/dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from "next/font/google";

import Script from '@/assets/script';

import Sidebar from '../../../components/SideBar';
import TopBar from '../../../components/TopBar';

import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  const { showHideSidebar, setShowHideSidebar } = Script()

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel='icon' type='icon/png' href='./../images/favicon.png' />
        </head>
        <body className={inter.className}>
          <div className="row">
            <Sidebar sidebarShow={showHideSidebar} onClickSidebarShow={() => setShowHideSidebar(!showHideSidebar)} />

            <div className={showHideSidebar ? "content sidebar-dekstop" : "content-full sidebar-responsive"}>
              <TopBar onClickSidebarShow={() => setShowHideSidebar(!showHideSidebar)} />

              {/* Content Here */}
              {children}
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
