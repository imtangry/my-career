'use client'

import {useWalletMultiButton} from '@solana/wallet-adapter-base-ui'
import {BaseWalletMultiButton} from '@solana/wallet-adapter-react-ui'
import {useEffect, useState} from 'react'

import {useTranslation} from '~/i18n/client'
import {Lang} from '~/i18n/config'

type LabelType = Omit<
  {
    [TButtonState in ReturnType<
      typeof useWalletMultiButton
    >['buttonState']]: string
  },
  'connected' | 'disconnecting'
> & {
  'copy-address': string
  copied: string
  'change-wallet': string
  disconnect: string
}

const LABELS: LabelType = {
  'change-wallet': 'changeWallet',
  connecting: 'connecting',
  'copy-address': 'copyAddress',
  copied: 'copied',
  disconnect: 'disconnect',
  'has-wallet': 'hasWallet',
  'no-wallet': 'noWallet'
}

export default function ConnectWallet({
  lang,
  className
}: {
  lang: Lang
  className?: string
}) {
  const [labels, setLabels] = useState<LabelType>({})
  const {t} = useTranslation(lang)

  useEffect(() => {
    const newLabels: LabelType = {...LABELS}
    Object.keys(LABELS).forEach((key) => {
      newLabels[key as keyof typeof LABELS] = t(
        LABELS[key as keyof typeof LABELS]
      )
    })
    setLabels(newLabels)
  }, [t])
  return (
    <BaseWalletMultiButton
      labels={labels}
      className={className}
    />
  )
}
