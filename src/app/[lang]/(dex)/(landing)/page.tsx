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
    <>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        landing
      </div>
    </>
  )
}

export default Landing
