import { PrismaObjectivesRepository } from '@/repositories/prisma/prisma-objectives-repository'
import { GetObjectivesUseCase } from '../get-objectives'

export function makeGetObjectiveUseCase() {
  const objectivesRepository = new PrismaObjectivesRepository()
  const getObjectiveUseCase = new GetObjectivesUseCase(objectivesRepository)

  return getObjectiveUseCase
}
