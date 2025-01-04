//how to make seed (windows) <<"New-Item -Path prisma -Name "seed.ts" -ItemType "File">>
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Mood
    await prisma.mood.createMany({
        data: [
        { type: 'Happy' },
        { type: 'Chill' },
        { type: 'Neutral' },
        { type: 'Sad' },
        { type: 'Angry' }
        ]
    });

  console.log('Default Moods created');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
