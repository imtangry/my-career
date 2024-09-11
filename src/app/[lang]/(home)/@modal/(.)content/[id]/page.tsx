import {PageBackButton} from '@/components/button/PageBackButton'
import {Editor} from '@/components/markdown/Editor'
import {NextPage} from 'next/types'

import {Lang} from '~/i18n/config'
import {useTranslation} from '~/i18n/server'

interface LandingProps {
  params: {
    lang: Lang
    id: string
  }
  searchParams: Record<string, string>
}

interface Title {
  description: string
  skill: string
  company: string
  project: string
  section: string
}

const title: Title = {
  description: 'resumeDescription',
  skill: 'resumeSkill',
  company: 'resumeCompany',
  project: 'resumeProject',
  section: 'resumeSection'
}

const Page: NextPage<LandingProps> = async ({
  params: {lang, id},
  searchParams
}) => {
  const {type} = searchParams
  const {t} = await useTranslation(lang)
  // 根据ID获取内容
  console.log(id)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div className='fixed left-0 top-0 z-[1000] h-full w-full overflow-hidden bg-gray-900 bg-opacity-75 p-6'>
      <div className='relative flex h-full w-full rounded-lg bg-white px-4'>
        <PageBackButton />
        <div className='container mx-auto flex flex-col items-center pb-4'>
          <div className='relative flex h-14 w-full items-center border-b'>
            <h1 className='text-2xl font-bold text-gray-800'>
              {t(title[type as keyof Title])}
            </h1>
          </div>
          <div className='mt-6 w-full flex-1 overflow-hidden'>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  )
}

Page.displayName = 'ContentEditPage'

export default Page
