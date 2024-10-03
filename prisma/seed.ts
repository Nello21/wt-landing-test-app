import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as fs from "fs";

async function main() {
    const data = fs.readFileSync(
        "C:/Users/Nekifor/Documents/projects/wt-landing-test-app/src/entity/products/_domain/products.json",
        "utf-8"
    );
    const products = JSON.parse(data);

    for (const product of products) {
        await prisma.product.create({
            data: {
                name: product.name,
                article: product.article,
                code: product.code,
                price: product.price,
            },
        });
    }

    console.log("Data successfully seeded!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
