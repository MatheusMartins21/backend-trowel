import { Goal } from '@prisma/client'
import { GoalsRepository } from '@/repositories/goals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { validateCompletion } from '@/utils/validate-completion'
import { ResourceCompletedChangeError } from './errors/resource-completed-change-error'

interface UpdateGoalUseCaseRequest {
  id: string
  title?: string
  description?: string
  budget?: number
  deadline?: string
  imageUrl?: string
  completed?: boolean
  userId: string
}

interface UpdateGoalUseCaseResponse {
  goal: Goal | void
}

export class UpdateGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute({
    id,
    title,
    description,
    budget,
    deadline,
    imageUrl,
    completed,
    userId,
  }: UpdateGoalUseCaseRequest): Promise<UpdateGoalUseCaseResponse> {
    const goals = await this.goalsRepository.findByUserId(userId)
    const goalBelongsUser = goals.find((goal) => goal.id === id)
    const isCompleted = validateCompletion(goalBelongsUser?.completed ?? false)

    if (!goalBelongsUser) {
      throw new ResourceNotFoundError()
    }

    if (isCompleted) {
      throw new ResourceCompletedChangeError()
    }

    const updatedGoal = await this.goalsRepository.update({
      id,
      title,
      description: description ?? goalBelongsUser?.description,
      budget: budget ?? goalBelongsUser?.budget,
      deadline: deadline ?? goalBelongsUser?.deadline,
      imageUrl: imageUrl ?? goalBelongsUser?.imageUrl,
      completed: completed ?? goalBelongsUser?.completed,
      userId,
    })

    return {
      goal: updatedGoal,
    }
  }
}
