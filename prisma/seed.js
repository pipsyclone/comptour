const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const md5 = require('md5')
const randomstring = require('randomstring')

async function main() {
    const user = await prisma.users.upsert({
        where: { email: 'user@mail.com' },
        update: {},
        create: {
            id: 'USR' + randomstring.generate({ length: 12, charset: 'numeric' }),
            name: 'User',
            email: 'user@mail.com',
            password: md5('user123'),
        },
    })

    const user2 = await prisma.users.upsert({
        where: { email: 'user2@mail.com' },
        update: {},
        create: {
            id: 'USR' + randomstring.generate({ length: 12, charset: 'numeric' }),
            name: 'User2',
            email: 'user2@mail.com',
            password: md5('user123'),
        },
    })

    const admin = await prisma.users.upsert({
        where: { email: 'admin@mail.com' },
        update: {},
        create: {
            id: 'USR' + randomstring.generate({ length: 12, charset: 'numeric' }),
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