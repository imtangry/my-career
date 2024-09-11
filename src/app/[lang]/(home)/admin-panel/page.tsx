'use client'

import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import {LAMPORTS_PER_SOL} from '@solana/web3.js'
import Link from 'next/link'
import {NextPage} from 'next/types'
import {useEffect, useState} from 'react'

import {useTranslation} from '~/i18n/client'
import {Lang} from '~/i18n/config'

interface AdminPanelProps {
  params: {
    lang: Lang
  }
}

const AddButton = ({lang, type}: {lang: Lang; type: string}) => {
  const {t} = useTranslation(lang)
  return (
    <Button className='w-24'>
      <Link
        href={{
          pathname: '/content/-1',
          query: {
            type
          }
        }}
        scroll={false}
      >
        {t('add')}
      </Link>
    </Button>
  )
}

const AdminPanel: NextPage<AdminPanelProps> = ({params: {lang}}) => {
  const {t} = useTranslation(lang)
  const {publicKey} = useWallet()
  const {connection} = useConnection()
  const [balance, setBalance] = useState<number>(0)
  console.log('AdminPanel', lang, publicKey, connection)
  useEffect(() => {
    if (publicKey) {
      ;(async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey)
        setBalance(newBalance / LAMPORTS_PER_SOL)
      })()
    }
  }, [publicKey])
  return (
    <div className='container mx-auto flex flex-col items-center justify-center'>
      <Card className='mt-14 w-full'>
        <CardHeader>
          <CardTitle>当前登陆账户：</CardTitle>
          <CardDescription>
            {publicKey?.toString() || 'Not connected'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'>
            <Label>Sol：{balance}</Label>
            <Label>节点：{connection.rpcEndpoint}</Label>
          </div>
        </CardContent>
      </Card>

      <Card className='mt-8 w-full'>
        <CardHeader>
          <CardTitle>{t('resumeDescription')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'></div>
        </CardContent>
        <CardFooter>
          <AddButton
            lang={lang}
            type='description'
          />
        </CardFooter>
      </Card>

      <Card className='mt-8 w-full'>
        <CardHeader>
          <CardTitle>{t('resumeSkill')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'></div>
        </CardContent>
        <CardFooter>
          <AddButton
            lang={lang}
            type='skill'
          />
        </CardFooter>
      </Card>

      <Card className='mt-8 w-full'>
        <CardHeader>
          <CardTitle>{t('resumeCompany')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'></div>
        </CardContent>
        <CardFooter>
          <AddButton
            lang={lang}
            type='company'
          />
        </CardFooter>
      </Card>

      <Card className='mt-8 w-full'>
        <CardHeader>
          <CardTitle>{t('resumeProject')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'></div>
        </CardContent>
        <CardFooter>
          <AddButton
            lang={lang}
            type='project'
          />
        </CardFooter>
      </Card>

      <Card className='mt-8 w-full'>
        <CardHeader>
          <CardTitle>{t('resumeSection')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'></div>
        </CardContent>
        <CardFooter>
          <AddButton
            lang={lang}
            type='section'
          />
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminPanel
