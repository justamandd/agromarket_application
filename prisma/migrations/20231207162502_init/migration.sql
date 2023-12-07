/*
  Warnings:

  - You are about to alter the column `total_price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,3)`.
  - You are about to alter the column `value` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,3)`.
  - You are about to alter the column `total_amount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,3)`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,3)`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(65,3);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,3);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "total_amount" SET DATA TYPE DECIMAL(65,3),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,3);
