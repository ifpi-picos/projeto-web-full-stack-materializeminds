-- CreateTable
CREATE TABLE "refresh_token_supllier" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "supllierId" TEXT NOT NULL,

    CONSTRAINT "refresh_token_supllier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_supllier_supllierId_key" ON "refresh_token_supllier"("supllierId");

-- AddForeignKey
ALTER TABLE "refresh_token_supllier" ADD CONSTRAINT "refresh_token_supllier_supllierId_fkey" FOREIGN KEY ("supllierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
