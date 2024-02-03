import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateGoalUseCase } from '@/use-cases/factories/make-create-goal-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGoalBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    budget: z.number().optional(),
    deadline: z.string().optional(),
    imageUrl: z.string().optional(),
  })

  const { title, description, budget, deadline, imageUrl } =
    createGoalBodySchema.parse(request.body)

  try {
    const createGoalUseCase = makeCreateGoalUseCase()

    await createGoalUseCase.execute({
      title,
      description,
      budget,
      deadline,
      imageUrl,
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
