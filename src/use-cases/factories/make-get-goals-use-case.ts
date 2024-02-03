import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'
import { GetGoalsUseCase } from '../get-goals'

export function makeGetGoalsUseCase() {
  const goalsRepository = new PrismaGoalsRepository()
  const getGoalsUseCase = new GetGoalsUseCase(goalsRepository)

  return getGoalsUseCase
}
