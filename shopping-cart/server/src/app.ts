import express from 'express'
import {productRouter} from '@/routers/product'
import {resetRouter} from '@/routers/reset'
import {orderRouter} from '@/routers/order'

export const app = express()

app.listen(4000)

app.use('/product', productRouter)
app.use('/reset', resetRouter)
app.use('/order', orderRouter)
