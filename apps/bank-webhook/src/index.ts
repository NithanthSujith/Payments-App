import express from "express";
import { prisma } from "@repo/db";


const app = express()

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //Add zod validation
    console.log("web hook accessed")
    const paymentInfomation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    const transaction = await prisma.onRampTransaction.findFirst({
        where : {
            token : paymentInfomation.token
        }
    })
    console.log("Transaction", transaction)
    if (transaction?.status !== "Processing") {
        res.status(409).json({
            message : "Transaction cannot be repeated"
        })
    }

    // Here we create a trasaction so that the possibility of updating on table and not updating the other is nullified

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInfomation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfomation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInfomation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.status(200).json({
            message: "captured"
        })
    } catch (error) {
        console.log(error)
        res.status(411).json({
            message : "error while processing webhook"
        })
    }





})

app.listen(3003)