import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveGoalUseCase } from '@/use-cases/factories/make-remove-goal-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeGoalParamsSchema = z.object({
    goalId: z.string().uuid(),
  })

  const { goalId } = removeGoalParamsSchema.parse(request.params)

  try {
    const removeGoalUseCase = makeRemoveGoalUseCase()

    const goals = await removeGoalUseCase.execute({
      id: goalId,
      userId: request.user.sub,
    })

    return reply.status(200).send(goals)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
