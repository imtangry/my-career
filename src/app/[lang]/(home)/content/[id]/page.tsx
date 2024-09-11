import {NextPage} from 'next/types'

import {Lang} from '~/i18n/config'

interface LandingProps {
  params: {
    lang: Lang
  }
}

const Landing: NextPage<LandingProps> = ({params: {lang, ...rest}}) => {
  console.log('lang4', lang, rest)

  return (
    <>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        Content here
      </div>
    </>
  )
}

export default Landing
