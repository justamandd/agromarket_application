-- CreateEnum
CREATE TYPE "pix_type" AS ENUM ('cpf', 'cnpj', 'email', 'phone', 'random');

-- CreateEnum
CREATE TYPE "mass_measure" AS ENUM ('kg', 'ton', 'bag');

-- CreateTable
CREATE TABLE "Customer" (
    "id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_customer_id" BIGINT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" BIGSERIAL NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "num" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_farm_id" BIGINT NOT NULL,
    "fk_customer_id" BIGINT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" BIGSERIAL NOT NULL,
    "pix_key" TEXT NOT NULL,
    "pix_type" "pix_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_customer_id" BIGINT NOT NULL,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mass_measure" "mass_measure" NOT NULL DEFAULT 'kg',
    "total_amount" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "harvest" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_farm_id" BIGINT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" BIGSERIAL NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_customer_id" BIGINT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "id" BIGSERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" BIGSERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_customer_id" BIGINT NOT NULL,
    "fk_order_id" BIGINT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProductOrder" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrderToProductOrder" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_fk_customer_id_key" ON "Farm"("fk_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_fk_farm_id_key" ON "Address"("fk_farm_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_fk_customer_id_key" ON "Address"("fk_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_id_key" ON "PaymentInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_pix_key_key" ON "PaymentInfo"("pix_key");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_fk_customer_id_key" ON "PaymentInfo"("fk_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_fk_farm_id_key" ON "Product"("fk_farm_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_fk_customer_id_key" ON "Payment"("fk_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_fk_order_id_key" ON "Payment"("fk_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductOrder_AB_unique" ON "_ProductToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductOrder_B_index" ON "_ProductToProductOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProductOrder_AB_unique" ON "_OrderToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProductOrder_B_index" ON "_OrderToProductOrder"("B");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_fk_farm_id_fkey" FOREIGN KEY ("fk_farm_id") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fk_farm_id_fkey" FOREIGN KEY ("fk_farm_id") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fk_order_id_fkey" FOREIGN KEY ("fk_order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductOrder" ADD CONSTRAINT "_ProductToProductOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductOrder" ADD CONSTRAINT "_ProductToProductOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductOrder" ADD CONSTRAINT "_OrderToProductOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductOrder" ADD CONSTRAINT "_OrderToProductOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
