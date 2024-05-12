-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "touristattractions" (
    "taid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "name_place" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longtitude" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "touristattractions_pkey" PRIMARY KEY ("taid")
);

-- CreateTable
CREATE TABLE "cultures" (
    "id" SERIAL NOT NULL,
    "taid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "name_image" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "cultures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "taid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "touristattractions" ADD CONSTRAINT "touristattractions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultures" ADD CONSTRAINT "cultures_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;