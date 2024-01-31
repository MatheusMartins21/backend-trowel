-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "objectives" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
