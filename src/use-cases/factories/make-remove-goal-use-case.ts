import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'
import { RemoveGoalUseCase } from '../remove-goal'
import { PrismaObjectivesRepository } from '@/repositories/prisma/prisma-objectives-repository'

export function makeRemoveGoalUseCase() {
  const goalsRepository = new PrismaGoalsRepository()
  const objectivesRepository = new PrismaObjectivesRepository()
  const removeGoalUseCase = new RemoveGoalUseCase(
    goalsRepository,
    objectivesRepository,
  )

  return removeGoalUseCase
}
