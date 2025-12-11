// prisma/seed.ts
import 'dotenv/config';

import prisma from '../lib/prisma';
import { seedServices } from './servicesData';

async function main() {
    console.log('Début du seeding...');

    // Exécuter votre seed
    await seedServices();

    console.log('Seeding terminé !');
}

main()
    .catch((e) => {
        console.error('Erreur lors du seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });