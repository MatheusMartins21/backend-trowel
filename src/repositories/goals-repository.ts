import { Goal, Prisma } from '@prisma/client'

export interface GoalsRepository {
  findById(id: string): Promise<Goal | null>
  findByUserId(userId: string): Promise<Goal[]>
  create(data: Prisma.GoalUncheckedCreateInput): Promise<Goal>
  update(data: Prisma.GoalUncheckedUpdateInput): Promise<Goal | void>
  remove(id: string, userId: string): Promise<void>
}
