-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expirationTime" INTEGER,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
