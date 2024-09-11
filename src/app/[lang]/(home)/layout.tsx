import Layout from '@/components/layout/BaseLayout'
import AppWalletProvider from '@/components/provider/AppWalletProvider'
import {FC, ReactNode} from 'react'

import {Lang} from '~/i18n/config'

interface WebLayoutProps {
  children: ReactNode
  params: {
    lang: Lang
  }
}

const WebLayout: FC<WebLayoutProps> = ({children, params: {lang}}) => {
  console.log('lang1', lang)
  return (
    <AppWalletProvider>
      <Layout lang={lang}>{children}</Layout>
    </AppWalletProvider>
  )
}

export default WebLayout
