-- CreateTable
CREATE TABLE "FidgetSpinner" (
    "id" SERIAL NOT NULL,
    "spinner_chosen" INTEGER NOT NULL DEFAULT 0,
    "music_chosen" INTEGER NOT NULL DEFAULT 0,
    "spins_score" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "FidgetSpinner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FidgetSpinner_user_id_key" ON "FidgetSpinner"("user_id");

-- AddForeignKey
ALTER TABLE "FidgetSpinner" ADD CONSTRAINT "FidgetSpinner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
