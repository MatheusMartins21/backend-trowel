import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { remove } from './remove.controller'
import { get } from './get.controller'

export async function goalsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/goals', create)
  app.delete('/goals/:goalId', remove)
  app.get('/goals', get)
}
