import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateObjectiveUseCase } from '../create-objective'
import { PrismaObjectivesRepository } from '@/repositories/prisma/prisma-objectives-repository'

export function makeCreateObjectiveUseCase() {
  const objectivesRepository = new PrismaObjectivesRepository()
  const usersRepository = new PrismaUsersRepository()
  const createObjectiveUseCase = new CreateObjectiveUseCase(
    objectivesRepository,
    usersRepository,
  )

  return createObjectiveUseCase
}
