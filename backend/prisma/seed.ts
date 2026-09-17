import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

type ProductSeed = {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
};

const prisma = new PrismaClient();

async function main() {
  const productsPath = fileURLToPath(
    new URL("./data/products.json", import.meta.url),
  );
  const source = JSON.parse(await readFile(productsPath, "utf8")) as {
    products: ProductSeed[];
  };

  for (const product of source.products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    if (adminPassword.length < 8) {
      throw new Error("ADMIN_PASSWORD must contain at least 8 characters.");
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash, role: Role.ADMIN },
      create: {
        name: "Admin",
        lastname: "Store",
        email: adminEmail,
        passwordHash,
        role: Role.ADMIN,
      },
    });
  }

  console.log(`Seeded ${source.products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
