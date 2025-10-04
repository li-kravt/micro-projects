import express from 'express'
import {db} from '@/common/helpers/db'
import { faker } from '@faker-js/faker'
import { randomPrice } from '@/common/helpers/random-price'

export const resetRouter = express.Router()

resetRouter.post('/', async (_req, res) => {
  try {
    await db.orderItem.deleteMany()
    await db.order.deleteMany()
    await db.item.deleteMany()
  } catch {
    res.status(500).send({error: 'Something went wrong while clearing the database'})
    return
  }

  try {
    const dishes = faker.helpers.uniqueArray(() => faker.food.dish(), 100)

    await db.item.createMany({
      data: dishes.map(dish => ({
        name: dish,
        price: randomPrice(5, 40)
      }))
    })

    res.send('ok')
  } catch {
    res.status(500).send({error: 'Something went wrong while populating the database'})
    return
  }
})
