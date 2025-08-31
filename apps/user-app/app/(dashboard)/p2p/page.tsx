import { getServerSession } from "next-auth";
import SendCard from "../../components/SendCard";
import TransactionHistory from "../../components/TransactionHistory";
import { authOptions } from "../../lib/auth";
import { prisma } from "@repo/db";

async function getTransactionHistory() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  
  const history = await prisma.p2PTransfer.findMany({
    where:{
      OR : [
        {senderId : Number(userId)},
        {recieverId : Number(userId)}
      ]
    },
    include:{
      sender : true,
      receiver : true,
    },
    orderBy : {
      timeStamp : "desc"
    }
  })


  return history.map((transaction)=>({
    timestamp : transaction.timeStamp,
    sender : transaction.sender,
    reciever : transaction.receiver,
    amount : transaction.amount
  }))
}
export default async function () {
  const transactionHistoryList = await getTransactionHistory()
  console.log(transactionHistoryList)
  return (
    <div className="w-full p-10">
      <div className="text-3xl text-violet-800 opacity-70 mb-6 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <SendCard />
        </div>
        <div className="col-span-2">
          <TransactionHistory history={transactionHistoryList} />
        </div>
      </div>
    </div>
  );
}
