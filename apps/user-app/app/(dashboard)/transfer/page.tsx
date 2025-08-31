import { getServerSession } from "next-auth";
import AddMoneyCard from "../../components/AddMoneyCard";
import BalanceCard from "../../components/BalanceCard";
import OnRampTransactions from "../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import { prisma } from "@repo/db";

async function getBalance() {
    const session =  await getServerSession(authOptions)
    console.log(session.user.id)
    const balance = await prisma.balance.findFirst({
        where:{
            userId : Number(session?.user?.id)
        }
    })
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}

async function getOnRampTransaction() {
    const session = await getServerSession(authOptions)
    const txns = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session?.user?.id)
        }
    })
    return  txns.map(t =>({
        time : t.startTime,
        amount : t.amount,
        status : t.status,
        provider : t.provider
    }))
}


export default async function Transfer(){
    const balance = await getBalance();
    const onRampTransactionsList = await getOnRampTransaction()
    return (
        <div className="w-screen px-6 ">
            <div className="text-3xl text-violet-800 opacity-70 mt-8 mb-6 font-bold">Transfer</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
                <div>
                    <AddMoneyCard/>
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={onRampTransactionsList} />
                    </div>
                </div>
            </div>
        </div>
    )
}