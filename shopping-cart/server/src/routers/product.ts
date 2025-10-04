import express from 'express'
import { fromZodError } from 'zod-validation-error'
import {z} from 'zod'
import { db } from '@/common/helpers/db'
import { jsonParser } from '@/common/parsers/json-parser'
import {Prisma} from '@prisma-generated/client'

export const productRouter = express.Router()

const DEFAULT_FILTER = {
  page: 1,
  limit: 10,
}

const filterSchema = z.object({
  page: z.preprocess((value: string) => parseInt(value), z.int().min(1)).default(DEFAULT_FILTER.page).transform(page => page - 1),
  limit: z.preprocess((value: string) => parseInt(value), z.int().min(1).max(10).optional()).default(DEFAULT_FILTER.limit),
  ids: z.preprocess((value: string) => value.split(','), z.array(z.uuid()).min(1)).optional()
})

productRouter.get('/', async (req, res) => {
  let filter

  try {
    filter = filterSchema.parse(req.query)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const {message} = fromZodError(error)
      res.status(400).send({error: message})
      return
    }

    res.status(500).send({error: 'Something went wrong'})
    return
  }

  const {page, limit, ids} = filter

  const where: Prisma.ItemWhereInput | undefined = ids?.length ? {id: {in: ids}} : undefined

  try {
    const [products, total] = await Promise.all([
      await db.item.findMany({
        skip: page * limit,
        take: limit,
        where,
      }),
      await db.item.count({ where })
    ])

    res.send({ products, total })
  } catch (error) {
    console.error(error)
    res.status(500).send({error: 'Something went wrong while getting products'})
  }
})

const patchSchema = z.object({
  price: z.number().gt(0).optional(),
  isAvailable: z.boolean().optional(),
})

productRouter.patch('/:id', jsonParser, async (req, res) => {
  let body

  try {
    body = patchSchema.parse(req.body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const {message} = fromZodError(error)
      res.status(400).send({error: message})
      return
    }

    console.error(error)
    res.status(500).send({error: 'Something went wrong while updating product'})
  }

  try {
    await db.item.update({
      where: {id: req.params.id},
      data: { ...body }
    })

    res.send('ok')
  } catch (error) {
    console.error(error)
    res.status(500).send({error: 'Something went wrong while updating product'})
  }
})
