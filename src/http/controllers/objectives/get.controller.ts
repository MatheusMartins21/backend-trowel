import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetObjectiveUseCase } from '@/use-cases/factories/make-get-objective-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getObjectiveBodySchema = z.object({
    goalId: z.string().uuid(),
  })

  const { goalId } = getObjectiveBodySchema.parse(request.params)

  try {
    const getUserProfile = makeGetObjectiveUseCase()

    const objectives = await getUserProfile.execute({
      goalId,
    })

    return reply.status(200).send(objectives)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
