// import { PrismaClient } from '../lib/generated/prisma';

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.product.createMany({
//     data: [
//       {
//         name: 'Collective Building',
//         nameFr: 'Bâtiment collectif',
//         description: 'For collective building projects',
//         descriptionFr: 'Pour les projets de bâtiments collectifs',
//         delay: '3 weeks',
//         price: 1150,
//         unit: 'm²',
//         isPopular: false,
//       },
//       {
//         name: 'Individual House',
//         nameFr: 'Maison individuelle',
//         description: 'For individual house projects',
//         descriptionFr: 'Pour les projets de maisons individuelles',
//         delay: '2 months',
//         price: 295000,
//         unit: '',
//         isPopular: true,
//       },
//       {
//         name: 'Extension/Elevation',
//         nameFr: 'Extension/Surélévation',
//         description: 'For extension or elevation projects',
//         descriptionFr: 'Pour les projets d\'extension ou de surélévation',
//         delay: '1 month',
//         price: 65000,
//         unit: '',
//         isPopular: false,
//       }
//     ],
//   });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
