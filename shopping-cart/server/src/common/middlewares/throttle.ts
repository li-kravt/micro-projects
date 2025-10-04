import {RequestHandler} from 'express'

const MIN_DELAY = 1_000
const MAX_DELAY = 5_000

export const throttle: RequestHandler = async (_req, _res, next) => {
  const delay = MIN_DELAY + Math.round(Math.random() * (MAX_DELAY - MIN_DELAY)) 
  await new Promise(resolve => setTimeout(resolve, delay))
  next()
}
