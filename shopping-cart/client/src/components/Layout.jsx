import {Outlet} from 'react-router'
import {Navigation} from './Navigation'

export const Layout = () => {
  return (
    <div className="h-dvh overflow-hidden flex flex-col bg-red-50">
      <Navigation />
      <div className="grow p-6">
        <Outlet />
      </div>
    </div>
  )
}
