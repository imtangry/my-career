'use client'

import {Button} from '@/components/ui/button'

import './swap.css'

import {cn} from '@/lib/utils'
import {useWallet} from '@solana/wallet-adapter-react'
import {ArrowUpDown} from 'lucide-react'
import {useState} from 'react'

import ConnectWallet from '../navbar/ConnectWallet'
import {SwapCard} from './SwapCard'

const cardHeight = 160
export const Swap = () => {
  const {publicKey} = useWallet()

  const [send, setSend] = useState({
    name: 'WETH',
    desc: 'Wrapped Ether (Portal from Ethereum)',
    icon: 'https://archive.cetus.zone/assets/image/wormhole/weth.png',
    value: '0'
  })

  const [receive, setReceive] = useState({
    name: 'SUI',
    desc: 'SUI Token',
    icon: 'https://archive.cetus.zone/assets/image/sui/sui.png',
    value: '0'
  })

  const reverse = () => {
    const temp = {...send}
    setSend({...receive})
    setReceive({...temp})
  }
  return (
    <div className='page-swap animate-in slide-in-from-bottom space-y-4'>
      <div className='relative space-y-2'>
        <SwapCard
          type='send'
          asset={send}
          setAsset={setSend}
          height={cardHeight}
        />

        <SwapCard
          type='receive'
          asset={receive}
          setAsset={setReceive}
          height={cardHeight}
        />

        <Button
          size='rounded'
          className='absolute left-1/2 h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 bg-[#f6931b] hover:bg-[#f6941bdb]'
          style={{
            top: cardHeight - 2 + 'px'
          }}
          onClick={reverse}
        >
          <ArrowUpDown className='h-8 w-8' />
        </Button>
      </div>
      {publicKey ? (
        <Button className='mt-4 h-14 w-full'>Swap</Button>
      ) : (
        <ConnectWallet lang='zh' className='w-full mt-4' />
      )}
    </div>
  )
}
