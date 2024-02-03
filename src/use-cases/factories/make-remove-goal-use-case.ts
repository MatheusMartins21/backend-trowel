import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'
import { RemoveGoalUseCase } from '../remove-goal'

export function makeRemoveGoalUseCase() {
  const goalsRepository = new PrismaGoalsRepository()
  const removeGoalUseCase = new RemoveGoalUseCase(goalsRepository)

  return removeGoalUseCase
}
