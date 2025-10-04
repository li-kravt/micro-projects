import {useEffect, useState} from 'react'
import {DishCard} from '../components/DishCard'
import { Pagination } from '../components/Pagination'

const API_URL = 'http://localhost:4000'

export const HomePage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true)
      const searchParams = new URLSearchParams({ page }).toString()

      try {
        const {products, total} = await fetch(`${API_URL}/product?${searchParams}`).then(res => res.json())
        
        setData(products)
        setTotal(total)
      } catch {} finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [page])

  return (
    <div className="flex flex-col gap-y-6 h-full">
      <div className="grid gap-4 grid-cols-5 grow content-start">
        {isLoading ? Array.from({length: 10}).map((_, index) => (
          <div key={index} className="bg-white h-74 animate-pulse rounded-xl" />
        )) : data.map(({id, name, price}) => (
          <DishCard
            key={id}
            id={id}
            name={name}
            price={price}
          />
        ))}
      </div>
      {total && (
        <Pagination page={page} setPage={setPage} total={total} limit={10} />
      )}
    </div>
  )
}
