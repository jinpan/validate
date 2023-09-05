-- CreateTable
CREATE TABLE "signups" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "signups_pkey" PRIMARY KEY ("id")
);
