import { ResourceCompletedChangeError } from '@/use-cases/errors/resource-completed-change-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateObjectiveUseCase } from '@/use-cases/factories/make-update-objective-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateObjectiveBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    expense: z.number().optional(),
    deadline: z.string().optional(),
    imageUrl: z.string().optional(),
    referenceUrl: z.string().optional(),
    completed: z.boolean().optional(),
  })

  const updateObjectiveParamsSchema = z.object({
    objectiveId: z.string().uuid(),
  })

  const {
    title,
    description,
    expense,
    deadline,
    imageUrl,
    referenceUrl,
    completed,
  } = updateObjectiveBodySchema.parse(request.body)

  const { objectiveId } = updateObjectiveParamsSchema.parse(request.params)

  try {
    const updateObjectiveUseCase = makeUpdateObjectiveUseCase()

    const objective = await updateObjectiveUseCase.execute({
      id: objectiveId,
      title,
      description,
      expense,
      deadline,
      imageUrl,
      referenceUrl,
      completed,
      userId: request.user.sub,
    })

    return reply.status(200).send(objective)
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
