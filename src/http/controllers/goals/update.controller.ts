import { ResourceCompletedChangeError } from '@/use-cases/errors/resource-completed-change-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateGoalUseCase } from '@/use-cases/factories/make-update-goal-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateGoalBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    budget: z.number().optional(),
    deadline: z.string().optional(),
    imageUrl: z.string().optional(),
    completed: z.boolean().optional(),
  })

  const updateGoalParamsSchema = z.object({
    goalId: z.string().uuid(),
  })

  const { title, description, budget, deadline, imageUrl, completed } =
    updateGoalBodySchema.parse(request.body)

  const { goalId } = updateGoalParamsSchema.parse(request.params)

  try {
    const updateGoalUseCase = makeUpdateGoalUseCase()

    const goal = await updateGoalUseCase.execute({
      id: goalId,
      title,
      description,
      budget,
      deadline,
      imageUrl,
      completed,
      userId: request.user.sub,
    })

    return reply.status(200).send(goal)
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
