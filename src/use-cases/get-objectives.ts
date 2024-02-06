import { Objective } from '@prisma/client'
import { ObjectivesRepository } from '@/repositories/objectives-repository'

interface GetObjectivesUseCaseRequest {
  goalId: string
}

interface GetObjectivesUseCaseResponse {
  objectives: Objective[]
}

export class GetObjectivesUseCase {
  constructor(private objectivesRepository: ObjectivesRepository) {}

  async execute({
    goalId,
  }: GetObjectivesUseCaseRequest): Promise<GetObjectivesUseCaseResponse> {
    const objectives = await this.objectivesRepository.findByGoalId(goalId)

    return {
      objectives,
    }
  }
}
