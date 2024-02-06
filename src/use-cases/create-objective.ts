import { Objective } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ObjectivesRepository } from '@/repositories/objectives-repository'

interface CreateObjectiveUseCaseRequest {
  title: string
  description?: string
  expense?: number
  deadline?: string
  imageUrl?: string
  referenceUrl?: string
  goalId: string
  userId: string
}

interface CreateObjectiveUseCaseResponse {
  objective: Objective
}

export class CreateObjectiveUseCase {
  constructor(
    private objectivesRepository: ObjectivesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    expense,
    deadline,
    imageUrl,
    referenceUrl,
    goalId,
    userId,
  }: CreateObjectiveUseCaseRequest): Promise<CreateObjectiveUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const objective = await this.objectivesRepository.create({
      title,
      description,
      expense,
      deadline,
      imageUrl,
      referenceUrl,
      goalId,
      userId,
    })

    return {
      objective,
    }
  }
}
