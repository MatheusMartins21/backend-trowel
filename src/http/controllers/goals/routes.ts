import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { remove } from './remove.controller'
import { get } from './get.controller'

export async function goalsRoutes(app: FastifyInstance) {
  app.post('/goals', { onRequest: [verifyJWT] }, create)
  app.delete('/goals/:goalId', { onRequest: [verifyJWT] }, remove)
  app.get('/goals', { onRequest: [verifyJWT] }, get)
}
