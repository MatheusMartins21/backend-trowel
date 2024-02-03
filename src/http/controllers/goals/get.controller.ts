import { makeGetGoalsUseCase } from '@/use-cases/factories/make-get-goals-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetGoalsUseCase()

  const goals = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(goals)
}
