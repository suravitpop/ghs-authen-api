// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordAdmin = await bcrypt.hash('Admin@123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { username: 'admin@email.com', id: 1 },
    update: {
      password: passwordAdmin,
    },
    create: {
      username: 'admin@youremail.com',
      fullname: 'Admin System',
      password: passwordAdmin,
    },
  });

  console.log({ user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
