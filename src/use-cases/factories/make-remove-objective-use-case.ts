import { PrismaObjectivesRepository } from '@/repositories/prisma/prisma-objectives-repository'
import { RemoveObjectiveUseCase } from '../remove-objective'
import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'

export function makeRemoveObjectiveUseCase() {
  const objectivesRepository = new PrismaObjectivesRepository()
  const goalsRepository = new PrismaGoalsRepository()
  const removeObjectiveUseCase = new RemoveObjectiveUseCase(
    objectivesRepository,
    goalsRepository,
  )

  return removeObjectiveUseCase
}
