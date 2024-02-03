import { Goal, Prisma } from '@prisma/client'
import { GoalsRepository } from '../goals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGoalsRepository implements GoalsRepository {
  public items: Goal[] = []

  async findById(id: string) {
    const goal = this.items.find((item) => item.id === id)

    if (!goal) {
      return null
    }

    return goal
  }

  async findByUserId(userId: string) {
    const goals = this.items.filter((item) => item.userId === userId)

    return goals
  }

  async create(data: Prisma.GoalUncheckedCreateInput) {
    const goal: Goal = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      budget: new Prisma.Decimal(data.budget?.toString() ?? ''),
      deadline: data.deadline ? new Date(data.deadline) : null,
      imageUrl: data.imageUrl ?? null,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
      userId: data.userId,
    }

    this.items.push(goal)

    return goal
  }

  async update(data: Goal) {
    const newGoals = this.items.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          data,
        }
      }

      return item
    })

    this.items = newGoals
  }

  async remove(id: string, userId: string) {
    const deletedGoal = this.items.filter(
      (item) => item.id !== id && item.userId === userId,
    )

    this.items = deletedGoal
  }
}
