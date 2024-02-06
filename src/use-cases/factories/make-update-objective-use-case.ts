import { PrismaObjectivesRepository } from '@/repositories/prisma/prisma-objectives-repository'
import { UpdateObjectiveUseCase } from '../update-objective'
import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'

export function makeUpdateObjectiveUseCase() {
  const objectivesRepository = new PrismaObjectivesRepository()
  const goalsRepository = new PrismaGoalsRepository()
  const updateObjectiveUseCase = new UpdateObjectiveUseCase(
    objectivesRepository,
    goalsRepository,
  )

  return updateObjectiveUseCase
}
