'use client'

import {cn} from '@/lib/utils'
import {useEffect, useState} from 'react'

import './styles/theme.css'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('')
  const changeTheme = () => {
    let nextTheme = 'light'
    if (theme === 'light') {
      nextTheme = 'dark'
    }

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.getElementsByTagName('html')[0].dataset.theme = nextTheme;
    document.documentElement.classList.add(nextTheme)
    document.documentElement.classList.remove(
      nextTheme === 'dark' ? 'light' : 'dark'
    )
  }
  useEffect(() => {
    const sysTheme = localStorage.getItem('theme') || 'light'
    setTheme(sysTheme)
  }, [])
  return (
    <div
      className={cn(
        'theme-switcher cursor-pointer',
        theme === 'dark' ? 'dark-mode' : 'light-mode'
      )}
      onClick={changeTheme}
    ></div>
  )
}
