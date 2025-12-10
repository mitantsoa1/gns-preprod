
import {
    Building2,
    FileText,
    CheckCircle2,
    Users,
    Hammer,
    HardHat,
    Truck
} from "lucide-react";

export const statsData = [
    {
        title: "dashboard.stats.activeProjects",
        value: "12",
        change: "+2.5%",
        changeType: "positive",
        icon: Building2,
        suffix: ""
    },
    {
        title: "dashboard.stats.pendingQuotes",
        value: "5",
        change: "-1",
        changeType: "neutral",
        icon: FileText,
        suffix: ""
    },
    {
        title: "dashboard.stats.completedSites",
        value: "145",
        change: "+4",
        changeType: "positive",
        icon: CheckCircle2,
        suffix: ""
    },
    {
        title: "dashboard.stats.clientSatisfaction",
        value: "4.9",
        change: "+0.1",
        changeType: "positive",
        icon: Users,
        suffix: "/5"
    }
];

export const projectsData = [
    {
        id: "PRJ-001",
        name: "Résidence Les Flamboyants",
        client: "SCI Horizon",
        type: "Bâtiment Collectif",
        status: "En cours",
        progress: 65,
        budget: "1 200 000€",
        startDate: "2024-01-15",
        endDate: "2024-12-20",
        location: "Saint-Denis"
    },
    {
        id: "PRJ-002",
        name: "Villa Martin",
        client: "M. & Mme Martin",
        type: "Maison Individuelle",
        status: "Planifié",
        progress: 0,
        budget: "350 000€",
        startDate: "2024-05-01",
        endDate: "2025-02-15",
        location: "Saint-Paul"
    },
    {
        id: "PRJ-003",
        name: "Rénovation École Nord",
        client: "Mairie de Saint-Denis",
        type: "Rénovation",
        status: "En cours",
        progress: 35,
        budget: "450 000€",
        startDate: "2024-03-10",
        endDate: "2024-09-30",
        location: "Saint-Denis"
    },
    {
        id: "PRJ-004",
        name: "Extension Entrepôt Logistique",
        client: "TransLog Réunion",
        type: "Extension",
        status: "Terminé",
        progress: 100,
        budget: "850 000€",
        startDate: "2023-08-01",
        endDate: "2024-02-28",
        location: "Le Port"
    }
];

export const quotesData = [
    {
        id: "DEV-2024-045",
        client: "M. Payet",
        project: "Construction Villa F4",
        amount: "285 000€",
        date: "2024-04-05",
        status: "En attente",
        validUntil: "2024-05-05"
    },
    {
        id: "DEV-2024-044",
        client: "SARL ImmoSud",
        project: "Gros œuvre Immeuble R+3",
        amount: "890 000€",
        date: "2024-04-02",
        status: "Accepté",
        validUntil: "2024-05-02"
    },
    {
        id: "DEV-2024-043",
        client: "Mme Hoareau",
        project: "Extension garage + clôture",
        amount: "45 000€",
        date: "2024-03-28",
        status: "Refusé",
        validUntil: "2024-04-28"
    }
];

export const activitiesData = [
    {
        id: 1,
        type: "quote",
        title: "Nouveau devis créé",
        description: "Devis #DEV-2024-045 pour M. Payet",
        time: "Il y a 2 heures",
        icon: FileText,
        color: "text-blue-500 bg-blue-100"
    },
    {
        id: 2,
        type: "project",
        title: "Chantier démarré",
        description: "Début des travaux : Rénovation École Nord",
        time: "Il y a 1 jour",
        icon: Hammer,
        color: "text-orange-500 bg-orange-100"
    },
    {
        id: 3,
        type: "milestone",
        title: "Fondations terminées",
        description: "Projet Résidence Les Flamboyants - Phase 1 validée",
        time: "Il y a 2 jours",
        icon: CheckCircle2,
        color: "text-green-500 bg-green-100"
    },
    {
        id: 4,
        type: "document",
        title: "Document signé",
        description: "Contrat signé par SARL ImmoSud",
        time: "Il y a 3 jours",
        icon: FileText,
        color: "text-purple-500 bg-purple-100"
    },
    {
        id: 5,
        type: "delivery",
        title: "Livraison matériaux",
        description: "Livraison béton sur le site Villa Martin",
        time: "Il y a 4 jours",
        icon: Truck,
        color: "text-yellow-500 bg-yellow-100"
    }
];
