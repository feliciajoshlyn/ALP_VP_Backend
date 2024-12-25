/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `whack_a_mole` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "whack_a_mole" ALTER COLUMN "timed_highscore" SET DEFAULT 0,
ALTER COLUMN "endless_highscore" SET DEFAULT 0,
ALTER COLUMN "intense_highscore" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "whack_a_mole_user_id_key" ON "whack_a_mole"("user_id");
