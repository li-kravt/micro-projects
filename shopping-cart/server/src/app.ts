import express from 'express'
import {productRouter} from '@/routers/product'
import {resetRouter} from '@/routers/reset'
import {orderRouter} from '@/routers/order'
import { throttle } from './common/middlewares/throttle'
import { disableCors } from './common/middlewares/disable-cors'

export const app = express()

app.listen(4000)

app.use(disableCors)
app.use(throttle)

app.use('/product', productRouter)
app.use('/reset', resetRouter)
app.use('/order', orderRouter)
