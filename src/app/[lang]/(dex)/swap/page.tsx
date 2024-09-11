import {Swap} from '@/components/swap'
import {NextPage} from 'next/types'

import {Lang} from '~/i18n/config'

interface LandingProps {
  params: {
    lang: Lang
  }
}

const Landing: NextPage<LandingProps> = ({params: {lang}}) => {
  console.log('lang4', lang)

  return (
    <div className='container mx-auto flex flex-col justify-center items-center p-8'>
      <div className='w-[480px]'>
        <Swap />
      </div>
    </div>
  )
}

export default Landing
