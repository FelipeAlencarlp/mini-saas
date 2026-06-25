import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "src/generated/prisma/client";
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)

    const user = await prisma.user.upsert({
        where: {
            email: 'admin@minisaas.com',
        },
        update: {},
        create: {
            email: 'admin@minisaas.com',
            name: 'Administrador',
            password: hashedPassword,
        },
    })
  
    console.log({ user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })