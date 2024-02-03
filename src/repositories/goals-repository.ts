import { Goal, Prisma } from '@prisma/client'

export interface GoalsRepository {
  findById(id: string): Promise<Goal | null>
  findByUserId(userId: string): Promise<Goal[]>
  create(data: Prisma.GoalUncheckedCreateInput): Promise<Goal>
  update(data: Goal): Promise<void>
  remove(id: string, userId: string): Promise<void>
}
