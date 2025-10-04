import {cn} from '../helpers/cn'
import { nameToAvatarBg } from "../helpers/name-to-avatar-bg"

export const DishCard = ({id, name, price}) => {
  const formattedPrice = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price)

  return (
    <div className="rounded-2xl p-3 flex flex-col gap-y-1 bg-white h-74">
      <div className="flex flex-col gap-y-1 grow">
        <div className={cn("rounded-lg aspect-[3/2]", nameToAvatarBg(name))}/>

        <div className="flex flex-col">
          <div className="truncate text-lg font-medium">
            {name}
          </div>
          
          <div className="font-bold">{formattedPrice}</div>
        </div>
      </div>
      <button
        className="p-2 font-bold rounded-lg bg-gray-100 text-gray-500 cursor-pointer active:scale-95 transition-transform"
      >
        Add
      </button>
    </div>
  )
}
