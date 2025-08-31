import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()


async function main() {
    const reshma = await prisma.user.upsert({
        where: { number: '9995160363' },
        update: {},
        create: {
            number: '9995160363',
            password: await bcrypt.hash('reshma', 10),
            name: 'Reshma',
            Balance: {
                create: {
                    amount: 200000,
                    locked: 0
                }
            },
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 2000,
                    token: 'token_1',
                    provider: 'HDFC Bank'
                },
            },

        }
    })


    const nithanth = await prisma.user.upsert({
        where: { number: '9316551033' },
        update: {},
        create: {
            number: '9316551033',
            password: await bcrypt.hash('nithanth', 10),
            name: 'Nithanth',
            Balance: {
                create: {
                    amount: 100000,
                    locked: 0
                }
            },
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 5000,
                    token: 'token_2',
                    provider: 'HDFC Bank'
                },
            },

        }
    })

    console.log({ reshma, nithanth })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e),
            await prisma.$disconnect()
        process.exit(1)
    })

