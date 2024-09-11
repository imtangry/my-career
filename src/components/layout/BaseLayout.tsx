import React, {ReactNode} from 'react'

import {Lang} from '~/i18n/config'

import NavBar from '../navbar/BaseNaveBar'

export interface BaseLayoutProps {
  children: ReactNode
  lang: Lang
}

const V2Layout: React.FC<BaseLayoutProps> = ({children, lang}) => {
  return (
    <div className={`flex h-[100vh] w-full flex-col overflow-hidden`}>
      <NavBar lang={lang} />
      <div className='m-auto w-full flex-1 overflow-auto'>
        <div className={`flex h-full w-full flex-col`}>
          <div className='relative w-full flex-1'>
            <main className='absolute left-0 top-0 h-full w-full'>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default V2Layout
