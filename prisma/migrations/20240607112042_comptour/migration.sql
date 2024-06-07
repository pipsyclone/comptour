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
    "province" TEXT,
    "regency" TEXT,
    "district" TEXT,
    "longtitude" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "description" TEXT NOT NULL,

    CONSTRAINT "touristattractions_pkey" PRIMARY KEY ("taid")
);

-- CreateTable
CREATE TABLE "cultures" (
    "id" SERIAL NOT NULL,
    "taid" TEXT NOT NULL,
    "name_image" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "cultures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "taid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "blogid" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blogid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "touristattractions" ADD CONSTRAINT "touristattractions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultures" ADD CONSTRAINT "cultures_taid_fkey" FOREIGN KEY ("taid") REFERENCES "touristattractions"("taid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_taid_fkey" FOREIGN KEY ("taid") REFERENCES "touristattractions"("taid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
