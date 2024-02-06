import { Objective } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ObjectivesRepository } from '@/repositories/objectives-repository'
import { validateCompletion } from '@/utils/validate-completion'
import { GoalsRepository } from '@/repositories/goals-repository'
import { ResourceCompletedChangeError } from './errors/resource-completed-change-error'

interface RemoveObjectiveUseCaseRequest {
  id: string
  userId: string
}

interface RemoveObjectiveUseCaseResponse {
  objectives: Objective[]
}

export class RemoveObjectiveUseCase {
  constructor(
    private objectivesRepository: ObjectivesRepository,
    private goalsRepository: GoalsRepository,
  ) {}

  async execute({
    id,
    userId,
  }: RemoveObjectiveUseCaseRequest): Promise<RemoveObjectiveUseCaseResponse> {
    const objectives = await this.objectivesRepository.findByUserId(userId)
    const objectiveBelongsUser = objectives.find(
      (objective) => objective.id === id,
    )
    const goal = await this.goalsRepository.findById(
      objectiveBelongsUser?.goalId ?? '',
    )

    const isCompletedGoal = validateCompletion(goal?.completed ?? false)

    if (!objectiveBelongsUser) {
      throw new ResourceNotFoundError()
    }

    if (isCompletedGoal) {
      throw new ResourceCompletedChangeError()
    }

    await this.objectivesRepository.remove(id)

    const newObjectives = await this.objectivesRepository.findByUserId(userId)

    return {
      objectives: newObjectives,
    }
  }
}
