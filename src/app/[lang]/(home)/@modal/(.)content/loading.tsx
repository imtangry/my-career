import {Skeleton} from '@/components/ui/skeleton'

export default function ContentLoading() {
  return (
    <div className='fixed left-0 top-0 z-[1000] h-full w-full overflow-hidden bg-gray-900 bg-opacity-75 p-6'>
      <div className='flex h-full w-full rounded-lg bg-white'>
        <div className='container mx-auto flex flex-col p-4'>
          <Skeleton className='h-14 w-full' />
          <Skeleton className='mt-6 w-full flex-1' />
        </div>
      </div>
    </div>
  )
}
