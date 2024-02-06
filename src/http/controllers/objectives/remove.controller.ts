import { ResourceCompletedChangeError } from '@/use-cases/errors/resource-completed-change-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveObjectiveUseCase } from '@/use-cases/factories/make-remove-objective-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeObjectiveParamsSchema = z.object({
    objectiveId: z.string().uuid(),
  })

  const { objectiveId } = removeObjectiveParamsSchema.parse(request.params)

  try {
    const removeObjectiveUseCase = makeRemoveObjectiveUseCase()

    const objectives = await removeObjectiveUseCase.execute({
      id: objectiveId,
      userId: request.user.sub,
    })

    return reply.status(200).send(objectives)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof ResourceCompletedChangeError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
