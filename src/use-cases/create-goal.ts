import { Goal } from '@prisma/client'
import { GoalsRepository } from '@/repositories/goals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateGoalUseCaseRequest {
  title: string
  description?: string
  budget?: number
  deadline?: string
  imageUrl?: string
  userId: string
}

interface CreateGoalUseCaseResponse {
  goal: Goal
}

export class CreateGoalUseCase {
  constructor(
    private goalsRepository: GoalsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    budget,
    deadline,
    imageUrl,
    userId,
  }: CreateGoalUseCaseRequest): Promise<CreateGoalUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const goal = await this.goalsRepository.create({
      title,
      description,
      budget,
      deadline,
      imageUrl,
      userId,
    })

    return {
      goal,
    }
  }
}
