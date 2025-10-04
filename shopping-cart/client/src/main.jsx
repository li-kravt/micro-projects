import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import {Layout} from './components/Layout'
import {HomePage} from './pages/Home'
import {CartPage} from './pages/Cart'
import {OrderPage} from './pages/Order'
import {OrdersPage} from './pages/Orders'
import {NotFoundPage} from './pages/NotFound'
import './index.css'

createRoot(document.body).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="orders">
          <Route index element={<OrdersPage />} />
          <Route path=":orderId" element={<OrderPage />} />
        </Route>

        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
