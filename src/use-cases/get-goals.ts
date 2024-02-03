import { Goal } from '@prisma/client'
import { GoalsRepository } from '@/repositories/goals-repository'

interface GetGoalsUseCaseRequest {
  userId: string
}

interface GetGoalsUseCaseResponse {
  goals: Goal[]
}

export class GetGoalsUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute({
    userId,
  }: GetGoalsUseCaseRequest): Promise<GetGoalsUseCaseResponse> {
    const goals = await this.goalsRepository.findByUserId(userId)

    return {
      goals,
    }
  }
}
