import { Card } from "@repo/ui/card";
import { OnRampStatus } from "@repo/db";

interface transaction {
  time: Date;
  amount: number;
  status: OnRampStatus;
  provider: string;
}

interface OnRampTransactionProps {
  transactions: transaction[];
}

const OnRampTransactions = ({ transactions }: OnRampTransactionProps) => {
  if (!transactions.length) {
    return <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">
            No Recent Transactions
        </div>
    </Card>;
  }
  return <Card title="Recent Transactions">
    <div className="pt-2 flex flex-col gap-2 ">
        {
            transactions.map((transaction)=>(
                <div key={transaction.time.toString()} className="flex justify-between items-center">
                    <div>
                        <div className={`text-md ${transaction.status === "Success" ? "text-green-700" : transaction.status === "Failure" ? "text-red-700" :"text-yellow-600"}`}>{transaction.status === "Success" ? "Recieved INR" : transaction.status === "Failure" ? "Attempted INR" :"Processing INR"}</div>
                        <div className="text-xs text-neutral-400">{transaction.time.toDateString()}</div>
                    </div>
                    <div className={`flex flex-col justify-center ${transaction.status === "Success" ? "text-green-700" : transaction.status === "Failure" ? "text-red-700" :"text-yellow-600"}`}>
                        + Rs {transaction.amount/100}
                    </div>
                </div>
                
            ))
        }
    </div>
  </Card>;
};

export default OnRampTransactions;
