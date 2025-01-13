-- CreateTable
CREATE TABLE "cookie_clicker" (
    "id" SERIAL NOT NULL,
    "total_cookies" INTEGER NOT NULL DEFAULT 0,
    "upgrade_power" INTEGER NOT NULL DEFAULT 1,
    "music_chosen" INTEGER NOT NULL DEFAULT 1,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "cookie_clicker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cookie_clicker_user_id_key" ON "cookie_clicker"("user_id");

-- AddForeignKey
ALTER TABLE "cookie_clicker" ADD CONSTRAINT "cookie_clicker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
