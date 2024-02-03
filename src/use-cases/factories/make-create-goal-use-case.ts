import { PrismaGoalsRepository } from '@/repositories/prisma/prisma-goals-repository'
import { CreateGoalUseCase } from '../create-goal'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateGoalUseCase() {
  const goalsRepository = new PrismaGoalsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createGoalUseCase = new CreateGoalUseCase(
    goalsRepository,
    usersRepository,
  )

  return createGoalUseCase
}
