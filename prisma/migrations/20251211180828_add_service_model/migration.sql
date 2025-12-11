-- AlterTable
ALTER TABLE "product" ADD COLUMN     "serviceIds" TEXT[];

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameFr" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);
