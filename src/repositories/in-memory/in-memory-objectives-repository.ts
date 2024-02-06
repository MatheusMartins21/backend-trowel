import { Objective, Prisma } from '@prisma/client'
import { ObjectivesRepository } from '../objectives-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGoalsRepository implements ObjectivesRepository {
  public items: Objective[] = []

  async findById(id: string) {
    const objective = this.items.find((item) => item.id === id)

    if (!objective) {
      return null
    }

    return objective
  }

  async findByUserId(userId: string) {
    const objectives = this.items.filter((item) => item.userId === userId)

    return objectives
  }

  async findByGoalId(goalId: string) {
    const objectives = this.items.filter((item) => item.goalId === goalId)

    return objectives
  }

  async create(data: Prisma.ObjectiveUncheckedCreateInput) {
    const objective: Objective = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      expense: new Prisma.Decimal(data.expense?.toString() ?? ''),
      deadline: data.deadline ? new Date(data.deadline) : null,
      imageUrl: data.imageUrl ?? null,
      referenceUrl: data.referenceUrl ?? null,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
      userId: data.userId,
      goalId: data.goalId,
    }

    this.items.push(objective)

    return objective
  }

  async update(data: Prisma.ObjectiveUncheckedUpdateInput) {
    const id = data.id?.toString() ?? ''

    const newObjectives = this.items.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          data,
        }
      }

      return item
    })

    this.items = newObjectives

    const objective = await this.findById(id)

    if (objective) return objective
  }

  async remove(id: string) {
    const newObjectives = this.items.filter((item) => item.id !== id)

    this.items = newObjectives
  }

  async removeByGoalId(goalId: string) {
    const newObjectives = this.items.filter((item) => item.goalId !== goalId)

    this.items = newObjectives

    return this.items
  }
}
