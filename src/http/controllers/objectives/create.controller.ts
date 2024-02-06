import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateObjectiveUseCase } from '@/use-cases/factories/make-create-objective-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createObjectiveBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    expense: z.number().optional(),
    deadline: z.string().optional(),
    imageUrl: z.string().optional(),
    referenceUrl: z.string().optional(),
    goalId: z.string().uuid(),
  })

  const {
    title,
    description,
    expense,
    deadline,
    imageUrl,
    referenceUrl,
    goalId,
  } = createObjectiveBodySchema.parse(request.body)

  try {
    const createObjectiveUseCase = makeCreateObjectiveUseCase()

    await createObjectiveUseCase.execute({
      title,
      description,
      expense,
      deadline,
      imageUrl,
      referenceUrl,
      goalId,
      userId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
