import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { get } from './get.controller'
import { update } from './update.controller'
import { remove } from './remove.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function objectivesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/objectives', create)
  app.get('/objectives/:goalId', get)
  app.put('/objectives/:objectiveId', update)
  app.delete('/objectives/:objectiveId', remove)
}
