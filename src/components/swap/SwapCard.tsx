'use client'

import {Button} from '@/components/ui/button'
import {useNumberInput} from '@/hooks/utils/useNumberInput'
import Image from 'next/image'
import { ToUsdcPrice } from './TokenToUsdc'

export type SwapAsset = {
  name: string
  desc: string
  icon: string
  value: string
}

export type SwapCardProps = {
  type: 'send' | 'receive'
  asset: SwapAsset
  setAsset: (value: SwapAsset) => void
  height: number
}

export const SwapCard = ({type, asset, setAsset, height}: SwapCardProps) => {
  const cardHeight = height
  const handleChange = useNumberInput((value) => setAsset({...asset, value}))

  return (
    <div
      className='swap-card flex flex-col justify-between rounded-2xl bg-neutral-200 px-4 py-2 shadow-md dark:bg-[#262626]'
      style={{
        maskImage:
          type === 'send'
            ? `radial-gradient(36px at 50% ${cardHeight + 6}px, transparent 36px, black 36px)`
            : '',
        height: cardHeight + 'px'
      }}
    >
      <div className='flex flex-nowrap overflow-hidden'>
        {/* 代币信息 */}
        <div className='flex flex-1 items-center'>
          <Button
            variant='outline'
            size='icon'
          >
            <Image
              width={32}
              height={32}
              src={asset.icon}
              alt='icon'
            />
          </Button>
          <div className='ml-2 flex flex-col justify-between overflow-hidden py-1'>
            <span className='ellipsis font-bold'>{asset.name}</span>
            <span className='ellipsis'>{asset.desc}</span>
          </div>
        </div>
        {/* 行情 */}
        <div className='min-w-28'></div>
      </div>
      {/* swap数量 */}
      <div className='relative'>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-lg font-bold'>
            {type === 'send' ? 'Send' : 'Receive'}
          </span>
          <div className='ml-4 flex-1'>
            <input
              type='text'
              className='mb-1 h-12 w-full border-primary px-4 text-right text-xl font-bold outline-none rounded-lg bg-transparent bg-gradient-to-l from-[#00000010] to-transparent'
              onChange={handleChange}
              value={asset.value}
            />
          </div>
          <div className='absolute right-0 pr-4 -bottom-1 h-5 text-neutral-60 animate-in slide-in-from-bottom'>
            <ToUsdcPrice address='So11111111111111111111111111111111111111112' amount={parseFloat(asset.value)}/>
          </div>
        </div>
      </div>
    </div>
  )
}
