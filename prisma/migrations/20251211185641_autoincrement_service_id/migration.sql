/*
  Warnings:

  - The `serviceIds` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "serviceIds",
ADD COLUMN     "serviceIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "service" DROP CONSTRAINT "service_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "service_pkey" PRIMARY KEY ("id");
