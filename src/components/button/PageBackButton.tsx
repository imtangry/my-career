'use client'
export const PageBackButton = () => {
  return (
    <div className='absolute right-3 top-3 z-10'>
      <button
        className='text-gray-500 hover:text-gray-900'
        onClick={() => window.history.back()}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  )
}
