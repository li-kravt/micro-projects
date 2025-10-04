import {cn} from '../helpers/cn'

export const Pagination = ({page, limit, total, setPage}) => {
  const pagesCount = Math.ceil(total / limit)

  return (
    <div className="flex gap-x-1 justify-center">
      {Array.from({length: pagesCount}).map((_, index) => {
        const pageIndex = index + 1
        return (
          <button
            key={index}
            disabled={pageIndex === page}
            className={cn(
              'rounded aspect-square h-10 active:scale-95 transition-transform',
              {
                'bg-black font-bold text-white': pageIndex === page,
                'bg-white text-black cursor-pointer': pageIndex !== page,
              }
            )}
            onClick={() => setPage(pageIndex)}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}
