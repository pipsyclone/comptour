const { PrismaClient } = require('@prisma/client')
const md5 = require('md5')
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.users.upsert({
        where: { email: 'user@mail.com' },
        update: {},
        create: {
            id: md5('User' + 'user@mail.com' + 'user123'),
            name: 'User',
            email: 'user@mail.com',
            password: md5('user123'),
        },
    })

    const user2 = await prisma.users.upsert({
        where: { email: 'user2@mail.com' },
        update: {},
        create: {
            id: md5('User2' + 'user2@mail.com' + 'user123'),
            name: 'User2',
            email: 'user2@mail.com',
            password: md5('user123'),
        },
    })

    const admin = await prisma.users.upsert({
        where: { email: 'admin@mail.com' },
        update: {},
        create: {
            id: md5('Admin' + 'admin@mail.com' + 'admin123'),
            name: 'Admin',
            email: 'admin@mail.com',
            password: md5('admin123'),
            role: 'ADMIN'
        },
    })

    console.log({ user, user2, admin })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })