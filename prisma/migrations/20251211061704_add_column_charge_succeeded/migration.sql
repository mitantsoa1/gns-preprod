-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "amountCaptured" DOUBLE PRECISION,
ADD COLUMN     "amountRefunded" DOUBLE PRECISION,
ADD COLUMN     "capturedAt" TIMESTAMP(3),
ADD COLUMN     "disputeReason" TEXT,
ADD COLUMN     "disputed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "failureCode" TEXT,
ADD COLUMN     "invoiceId" TEXT;

-- CreateIndex
CREATE INDEX "payment_stripeChargeId_idx" ON "payment"("stripeChargeId");

-- CreateIndex
CREATE INDEX "payment_customerEmail_idx" ON "payment"("customerEmail");

-- CreateIndex
CREATE INDEX "payment_createdAt_idx" ON "payment"("createdAt");
