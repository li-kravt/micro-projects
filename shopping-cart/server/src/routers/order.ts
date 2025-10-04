import { db } from '@/common/helpers/db'
import { jsonParser } from '@/common/parsers/json-parser'
import express from 'express'
import {z} from 'zod'
import { fromZodError } from 'zod-validation-error'

export const orderRouter = express.Router()

const idSchema = z.uuid()

orderRouter.get('/:id', async (req, res) => {
  let id

  try {
    id = idSchema.parse(req.params.id)
  } catch(error) {
    if (error instanceof z.ZodError) {
      res.status(404).send({error: 'Order not found'})
      return
    }

    console.error(error)
    res.status(500).send({error: 'Something went wrong while parsing id parameter'})
    return
  }

  try {
    const order = await db.order.findUnique({where: {id}, include: {items: true}})

    if (!order) {
      res.status(404).send({error: 'Order not found'})
    }

    res.send({order})
    return
  } catch (error) {
    console.error(error)
    res.status(500).send({error: 'Something went wrong while searching the order'})
  }
})

const orderSchema = z.object({
  items: z.array(z.object({
    id: z.uuid(),
    quantity: z.int().min(1)
  })).min(1).superRefine((value, ctx) => {
    const uniqueIds = new Set(value.map(({id}) => id))

    if (uniqueIds.size !== value.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'No duplicate items',
        input: value
      })
    }
  })
})

orderRouter.post('/', jsonParser, async (req, res) => {
  let body

  try {
    body = orderSchema.parse(req.body) 
  } catch (error) {
    if (error instanceof z.ZodError) {
      const {message} = fromZodError(error)

      res.status(400).send({error: message})
    }

    console.error(error)
    res.status(500).send({error: 'Something went wrong while creating an order'})
    return
  }

  const {items} = body

  const productIds = items.map(({id}) => id)
  const idQuantityMap = new Map(items.map(({id, quantity}) => [id, quantity]))

  let total = 0

  try {
    const products = await db.item.findMany({where: {id: {in: productIds}}})
    const allProductIds = new Set(products.map(({id}) => id))
    const notFoundProductIds = productIds.filter(id => !allProductIds.has(id))

    if (notFoundProductIds.length > 0) {
      res.status(422).send({error: 'Could not create an order because some products do not exist', notFoundProductIds})
      return
    }

    const unavailableProductIds = products.filter(({isAvailable}) => !isAvailable).map(({id}) => id)

    if (unavailableProductIds.length > 0) {
      res.status(422).send({error: 'Could not create an order because some products are not available', unavailableProductIds})
      return
    }

    total = products.reduce((acc, {id, price}) => {
      const quantity = idQuantityMap.get(id)
      if (!quantity) throw new Error('Quantity was not found')
      return acc + quantity * price
    }, 0)
  } catch (error) {
    console.error(error)
    res.status(500).send({error: 'Something went wrong while creating an order'})
  }

  try {
    const order = await db.order.create({
      data: {
        total,
        items: {
          createMany: {
            data: items.map(({id: itemId, quantity}) => ({
              itemId, quantity
            }))
          }
        }
      }
    })

    res.send({order})
  } catch(error) {
    console.error(error)
    res.status(500).send({error: 'Something went wrong while creating an order'})
  }
})
