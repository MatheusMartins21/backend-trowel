import { Objective } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ObjectivesRepository } from '@/repositories/objectives-repository'
import { ResourceCompletedChangeError } from './errors/resource-completed-change-error'
import { validateCompletion } from '@/utils/validate-completion'
import { GoalsRepository } from '@/repositories/goals-repository'

interface UpdateObjectiveUseCaseRequest {
  id: string
  title?: string
  description?: string
  expense?: number
  deadline?: string
  imageUrl?: string
  referenceUrl?: string
  completed?: boolean
  userId: string
}

interface UpdateObjectiveUseCaseResponse {
  objective: Objective | void
}

export class UpdateObjectiveUseCase {
  constructor(
    private objectivesRepository: ObjectivesRepository,
    private goalsRepository: GoalsRepository,
  ) {}

  async execute({
    id,
    title,
    description,
    expense,
    deadline,
    imageUrl,
    referenceUrl,
    completed,
    userId,
  }: UpdateObjectiveUseCaseRequest): Promise<UpdateObjectiveUseCaseResponse> {
    const objectives = await this.objectivesRepository.findByUserId(userId)
    const objectiveBelongsUserAndGoal = objectives.find(
      (objective) => objective.id === id,
    )
    const goal = await this.goalsRepository.findById(
      objectiveBelongsUserAndGoal?.goalId ?? '',
    )
    const isCompletedGoal = validateCompletion(goal?.completed ?? false)
    const isCompletedObjective = validateCompletion(
      objectiveBelongsUserAndGoal?.completed ?? false,
    )

    if (!objectiveBelongsUserAndGoal) {
      throw new ResourceNotFoundError()
    }

    if (isCompletedObjective || isCompletedGoal) {
      throw new ResourceCompletedChangeError()
    }

    const updatedObjective = await this.objectivesRepository.update({
      id,
      title,
      description: description ?? objectiveBelongsUserAndGoal?.description,
      expense: expense ?? objectiveBelongsUserAndGoal?.expense,
      deadline: deadline ?? objectiveBelongsUserAndGoal?.deadline,
      imageUrl: imageUrl ?? objectiveBelongsUserAndGoal?.imageUrl,
      referenceUrl: referenceUrl ?? objectiveBelongsUserAndGoal?.referenceUrl,
      completed: completed ?? objectiveBelongsUserAndGoal?.completed,
      userId,
    })

    return {
      objective: updatedObjective,
    }
  }
}
