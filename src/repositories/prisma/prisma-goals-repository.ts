import { prisma } from '@/lib/prisma'
import { Goal, Prisma } from '@prisma/client'
import { GoalsRepository } from '../goals-repository'
import dayjs from 'dayjs'

export class PrismaGoalsRepository implements GoalsRepository {
  async findById(id: string) {
    const goal = await prisma.goal.findUnique({
      where: {
        id,
      },
    })

    return goal
  }

  async findByUserId(userId: string) {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
    })

    return goals
  }

  async create(data: Prisma.GoalUncheckedCreateInput) {
    const formatedDeadline = dayjs(data.deadline).format()

    const goal = await prisma.goal.create({
      data: {
        ...data,
        deadline: formatedDeadline,
      },
    })

    return goal
  }

  async update(data: Goal) {
    await prisma.goal.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async remove(id: string, userId: string) {
    await prisma.goal.delete({
      where: {
        id,
        userId,
      },
    })
  }
}
