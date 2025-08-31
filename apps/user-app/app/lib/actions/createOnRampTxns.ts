"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";


export default async function createOnRampTransaction(amount:number , provider:string){
    console.log("inside createOnRamp")
    const session =  await getServerSession(authOptions)
    const token = Math.random().toString()
    const userId = session?.user.id;
    if (!userId) {
        return {
            message : "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount,
            status : "Processing",
            provider,
            startTime : new Date(),
            token : token

        }
    })

    return {
        messsage : "Transaction was successful"
    }
}