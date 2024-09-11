import {useEffect, useState} from 'react'


const ToUsdcPrice = ({address, amount}: {address: string; amount: number}) => {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true)

        const usdcMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

        const params = {
          inputMint: address,
          outputMint: usdcMint,
          amount, //
          slippageBps: 50 // 允许 0.5% 滑点
        }
        const queryString = new URLSearchParams(params).toString()
        const response = await fetch(
          `https://quote-api.jup.ag/v6/quote?${queryString}`
        )
        const data = await response.json()

        console.log(data);
        

        // 如果有有效的路线
        if (data && data.data && data.data.length > 0) {
          const bestQuote = data.data[0]
          const toUsdcPrice = bestQuote.outAmount / bestQuote.inAmount
          setPrice(toUsdcPrice)
        } else {
          throw new Error('No quotes found')
        }
      } catch (err) {
        console.error('Failed to fetch WETH price:', err)
        setError('Failed to fetch price')
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
  }, [])

  if (loading) {
    return <span className='absolute w-20 right-0 bottom-0 top-0 animate-pulse rounded bg-gray-100'></span>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return <span>${price?.toFixed(2)}</span>
}

export {ToUsdcPrice}
