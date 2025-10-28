'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DashboardMenus from './mesunData.json'
import SettingsMenus from './settings/setting.json'

import Popup from '@/view/popup/index'
import Search from '@/view/search/index'
import Calendar from '@/view/extra/calendar'
import Bell from '@/view/extra/bell'
import Grip from '@/view/extra/dot3'
import {
  ChevronDown,
  FolderClosed,
  ChartColumnDecreasing,
  Clock2,
  FilePenLine,
  FilePlus,
  Store,
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
} from 'lucide-react'

// Icon map
const iconMap = {
  modules: <FolderClosed size={20} />,
  reports: <ChartColumnDecreasing size={20} />,
  dashboard: <Clock2 size={20} />,
  request: <FilePenLine size={20} />,
  marketplace: <Store size={20} />,
  filePlus: <FilePlus size={20} />,
  settings: <SettingsIcon size={20} />,
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState('modules')
  const [openSub, setOpenSub] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  // ✅ detect active menu
  useEffect(() => {
    const allMenus = [...DashboardMenus, { name: 'settings' }]
    const current = allMenus.find((menu) =>
      pathname.startsWith(`/dashboard/${menu.name}`)
    )
    if (current) setActiveMenu(current.name)
  }, [pathname])

  // ✅ get menu data
  const currentMenu =
    activeMenu === 'settings'
      ? SettingsMenus
      : DashboardMenus.find((menu) => menu.name === activeMenu)?.sub

  // ✅ render submenus
  const renderSubMenus = (subMenus, basePath) => (
    <ul className="space-y-1">
      {subMenus.map((sub) =>
        typeof sub === 'string' ? (
          <li
            key={sub}
            className={`rounded hover:bg-gray-700 ${
              pathname.endsWith(sub) ? 'bg-gray-700' : ''
            }`}
          >
            <Link href={`${basePath}/${sub}`} className="block w-full p-2 capitalize">
              {sub.replace('-', ' ')}
            </Link>
          </li>
        ) : (
          <li key={sub.name}>
            <div
              className={`w-full flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer ${
                openSub === sub.name ? 'bg-gray-700' : ''
              }`}
              onClick={() =>
                setOpenSub(openSub === sub.name ? null : sub.name)
              }
            >
              <span className="capitalize">{sub.name.replace('-', ' ')}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openSub === sub.name ? 'rotate-180' : 'rotate-0'
                }`}
                size={18}
              />
            </div>

            {openSub === sub.name && (
              <ul className="ml-4 mt-2 space-y-1">
                {renderSubMenus(sub.children || [], `${basePath}/${sub.name}`)}
              </ul>
            )}
          </li>
        )
      )}
    </ul>
  )

  return (
    <div className="flex h-screen">
      {/* LEFT ICON BAR */}
      <div className="w-12 bg-gray-900 text-white flex flex-col items-center py-4 space-y-4">
        {DashboardMenus.map((menu) => (
          <button
            key={menu.name}
            className={`flex flex-col items-center p-2 rounded hover:bg-gray-700 ${
              activeMenu === menu.name ? 'bg-gray-700' : ''
            }`}
            onClick={() => {
              setActiveMenu(menu.name)
              setOpenSub(null)
            }}
          >
            {iconMap[menu.name]}
          </button>
        ))}

        {/* Bottom Icons */}
        <div className="mt-20 space-y-3">
          <Popup />
          <Search />
          <Calendar />
          <Bell />

          {/* Settings */}
          <button
            className={`flex flex-col items-center p-2 rounded hover:bg-gray-700 ${
              activeMenu === 'settings' ? 'bg-gray-700' : ''
            }`}
            onClick={() => {
              setActiveMenu('settings')
              setOpenSub(null)
            }}
          >
            {iconMap['settings']}
          </button>

          <Grip />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        className={`relative bg-gray-800 text-white overflow-y-auto transition-all duration-300 ${
          collapsed ? 'w-0' : 'w-[220px]'
        }`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 bottom-2 bg-gray-700 text-white p-1 rounded-full shadow-md hover:bg-gray-600 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {!collapsed && (
          <div className="p-3">
            <h2 className="text-lg font-bold mb-4 capitalize">
              {activeMenu.replace('-', ' ')}
            </h2>

            {renderSubMenus(
              currentMenu || [],
              activeMenu === 'settings'
                ? `/dashboard/settings`
                : `/dashboard/${activeMenu}`
            )}
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  )
}
