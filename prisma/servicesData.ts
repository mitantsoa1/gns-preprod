// prisma/servicesData.ts

import prisma from "@/lib/prisma";

const servicesData = [
    {
        name: "Soil study & foundations",
        nameFr: "Étude de sol & fondations"
    },
    {
        name: "Reinforced concrete structure",
        nameFr: "Structure béton armé"
    },
    {
        name: "Load-bearing walls & partitions",
        nameFr: "Murs porteurs & cloisons"
    },
    {
        name: "Roof waterproofing",
        nameFr: "Etanchéité toiture"
    },
    {
        name: "Thermal & acoustic insulation",
        nameFr: "Isolation thermique & phonique"
    },
    {
        name: "Drainage networks (water, rainwater)",
        nameFr: "Réseaux d'évacuation (eaux, pluviales)"
    },
    {
        name: "Structural finishes (stairs, slabs)",
        nameFr: "Finitions structurelles (escaliers, dalles)"
    },
    {
        name: "Technical study & engineering",
        nameFr: "Étude technique & ingénierie"
    },
    {
        name: "Trade coordination",
        nameFr: "Coordination des corps d'état"
    }
];

export async function seedServices() {
    for (const service of servicesData) {
        await prisma.service.create({
            data: service
        });
    }
    console.log('Services créés!');
}