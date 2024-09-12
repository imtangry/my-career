'use client'

import {useCustomPathname} from '@/hooks/route/useCustomPathname'
import {useRedirect} from '@/hooks/route/useRedirect'
import {cn} from '@/lib/utils'
import {useWallet} from '@solana/wallet-adapter-react'
import {useEffect, useState} from 'react'

import {useTranslation} from '~/i18n/client'
import {Lang} from '~/i18n/config'

import {MenuLink, NavbarItem} from './type'

const list: NavbarItem[] = [
  {
    label: 'adminPanel',
    path: MenuLink.ADMIN_PANEL
  }
]

export const NavList = ({lang}: {lang: Lang}) => {
  console.log('lang3', lang)
  const [navList, setNavList] = useState<NavbarItem[]>([])
  const {publicKey} = useWallet()
  const pathname = useCustomPathname()
  const {redirectToUrl} = useRedirect()
  const {t} = useTranslation(lang)

  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nav: NavbarItem
  ) => {
    const path = nav.path as MenuLink
    if (path === pathname) return
    redirectToUrl(path)
  }

  useEffect(() => {
    if (publicKey) {
      setNavList(list.map((nav) => ({...nav, label: t(nav.label)})))
    } else {
      setNavList([])
    }
  }, [publicKey])

  return (
    <>
      {navList.map((nav) => (
        <div
          key={nav.label}
          onClick={(e) => handleClickNav(e, nav)}
          className={cn(
            'hover-underline group relative flex h-full cursor-pointer items-center hover:bg-neutral-200 dark:hover:bg-neutral-800',
            {
              'active bg-neutral-200 font-bold dark:bg-neutral-800':
                pathname === nav.path
            }
          )}
        >
          <div className='flex items-center gap-1 px-8 py-1'>
            <div className='capitalize'>
              <span>{nav.label}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
