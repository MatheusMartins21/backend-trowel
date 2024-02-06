import { Objective, Prisma } from '@prisma/client'

export interface ObjectivesRepository {
  findById(id: string): Promise<Objective | null>
  findByUserId(userId: string): Promise<Objective[]>
  findByGoalId(goalId: string): Promise<Objective[]>
  create(data: Prisma.ObjectiveUncheckedCreateInput): Promise<Objective>
  update(data: Prisma.ObjectiveUncheckedUpdateInput): Promise<Objective | void>
  remove(id: string): Promise<void>
  removeByGoalId(goalId: string): Promise<Objective[]>
}
