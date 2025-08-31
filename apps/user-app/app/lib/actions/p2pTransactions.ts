"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { prisma } from "@repo/db"

export default async function p2pTransaction(recieverNumber: string, amount: number) {
    const session = await getServerSession(authOptions)
    const sender = session?.user?.id

    if (!sender) {
        return {
            message: "Error while validating user"
        }
    }

    const reciever = await prisma.user.findFirst({
        where: {
            number: recieverNumber
        }
    })

    if (!reciever) {
        return {
            message: "Reciever not found"
        }
    }

    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(reciever.id)} FOR UPDATE`; // locking the row so that concurrent transactions dont occue and transactions that come at the same time wait for one to complete


        const senderBalance = await tx.balance.findUnique({
            where: {
                userId: Number(sender)
            }
        })

        if (!senderBalance || senderBalance.amount < amount) {
            throw new Error("Insufficient Funds")

        }

        await tx.balance.update({
            where: {
                userId: Number(sender)
            },
            data: {
                amount: { decrement: amount }
            }
        })

        await tx.balance.update({
            where: {
                userId: reciever.id
            },
            data: {
                amount: { increment: amount }
            }
        })

        await tx.p2PTransfer.create({
            data:{
                senderId : Number(sender),
                recieverId : reciever.id,
                timeStamp : new Date(),
                amount : amount
            }
        })

    })
}