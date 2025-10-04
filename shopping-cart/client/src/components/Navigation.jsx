import { NavLink } from "react-router"
import {cn} from '../helpers/cn'
import {MdOutlineShoppingCart as CartIconOutline, MdShoppingCart as CartIconSolid} from 'react-icons/md'

const LINKS = [
  {
    to: '/',
    name: 'Home',
  },
  {
    to: '/orders',
    name: 'Orders',
  },
]

export const Navigation = () => {
  return (
    <nav className="px-6 flex items-center bg-orange-500">
      {LINKS.map(({to, name}) => (
        <NavLink
          key={name}
          to={to}
          className={({isActive}) => cn(
            'text-lg px-4 py-3 text-white text-center w-24',
            {
              'font-bold': isActive
            }
          )}
        >
          {name}
        </NavLink>
      ))}
      <div className="grow" />
      <NavLink
        to="/cart"
        className={({isActive}) => cn(
          'rounded text-2xl p-2',
          {
            'bg-white text-orange-500': isActive,
            'text-white': !isActive
          }
        )}
      >
        {({isActive}) => isActive ? <CartIconSolid /> : <CartIconOutline />}
      </NavLink>
    </nav>
  )
}
