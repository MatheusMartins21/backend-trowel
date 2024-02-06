import { Goal } from '@prisma/client'
import { GoalsRepository } from '@/repositories/goals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ObjectivesRepository } from '@/repositories/objectives-repository'

interface RemoveGoalUseCaseRequest {
  id: string
  userId: string
}

interface RemoveGoalUseCaseResponse {
  goals: Goal[]
}

export class RemoveGoalUseCase {
  constructor(
    private goalsRepository: GoalsRepository,
    private objectivesRepository: ObjectivesRepository,
  ) {}

  async execute({
    id,
    userId,
  }: RemoveGoalUseCaseRequest): Promise<RemoveGoalUseCaseResponse> {
    const goals = await this.goalsRepository.findByUserId(userId)

    const goalBelongsUser = goals.find((goal) => goal.id === id)

    if (!goalBelongsUser) {
      throw new ResourceNotFoundError()
    }

    await this.objectivesRepository.removeByGoalId(id)
    await this.goalsRepository.remove(id, userId)

    const newGoals = await this.goalsRepository.findByUserId(userId)

    return {
      goals: newGoals,
    }
  }
}
