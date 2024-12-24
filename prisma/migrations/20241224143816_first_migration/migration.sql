-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whack_a_mole" (
    "id" SERIAL NOT NULL,
    "mole_chosen" VARCHAR(100) NOT NULL,
    "music_chosen" VARCHAR(100) NOT NULL,
    "timed_highscore" INTEGER NOT NULL,
    "endless_highscore" INTEGER NOT NULL,
    "intense_highscore" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "whack_a_mole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendarentries" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "note" VARCHAR(1000) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "calendarentries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendarmood" (
    "id" SERIAL NOT NULL,
    "calendar_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    CONSTRAINT "calendarmood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "whack_a_mole" ADD CONSTRAINT "whack_a_mole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendarentries" ADD CONSTRAINT "calendarentries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendarmood" ADD CONSTRAINT "calendarmood_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "calendarentries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendarmood" ADD CONSTRAINT "calendarmood_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;
