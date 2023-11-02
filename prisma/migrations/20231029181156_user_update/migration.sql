/*
  Warnings:

  - You are about to drop the column `endereco` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenome` on the `users` table. All the data in the column will be lost.
  - Added the required column `accountStatus` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "endereco",
DROP COLUMN "sobrenome",
ADD COLUMN     "accountStatus" TEXT NOT NULL;
