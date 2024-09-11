'use client'

import {BaseWalletMultiButton} from '@solana/wallet-adapter-react-ui'
import React from 'react'
import { useTranslation } from '~/i18n/client'

import {Lang} from '~/i18n/config'

export default function ConnectWallet({lang, className}: {lang: Lang, className?: string}) {
  const {t} = useTranslation(lang)
  const LABELS = {
    'change-wallet': t('changeWallet'),
    connecting: t('connecting'),
    'copy-address': t('copyAddress'),
    copied: t('copied'),
    disconnect: t('disconnect'),
    'has-wallet': t('hasWallet'),
    'no-wallet': t('noWallet'),
  } as const
  return <BaseWalletMultiButton labels={LABELS} className={className} />
}
