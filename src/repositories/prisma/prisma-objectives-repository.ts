import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ObjectivesRepository } from '../objectives-repository'
import dayjs from 'dayjs'

export class PrismaObjectivesRepository implements ObjectivesRepository {
  async findById(id: string) {
    const objective = await prisma.objective.findUnique({
      where: {
        id,
      },
    })

    return objective
  }

  async findByUserId(userId: string) {
    const objective = await prisma.objective.findMany({
      where: {
        userId,
      },
    })

    return objective
  }

  async findByGoalId(goalId: string) {
    const objective = await prisma.objective.findMany({
      where: {
        goalId,
      },
    })

    return objective
  }

  async create(data: Prisma.ObjectiveUncheckedCreateInput) {
    const formatedDeadline = dayjs(data.deadline).format()

    const objective = await prisma.objective.create({
      data: {
        ...data,
        deadline: formatedDeadline,
      },
    })

    return objective
  }

  async update(data: Prisma.ObjectiveUncheckedUpdateInput) {
    const id = data.id?.toString() ?? ''

    const objective = await prisma.objective.update({
      where: {
        id,
      },
      data,
    })

    return objective
  }

  async remove(id: string) {
    await prisma.objective.delete({
      where: {
        id,
      },
    })
  }

  async removeByGoalId(goalId: string) {
    await prisma.objective.deleteMany({
      where: {
        goalId,
      },
    })

    const goals = await this.findByGoalId(goalId)

    return goals
  }
}
