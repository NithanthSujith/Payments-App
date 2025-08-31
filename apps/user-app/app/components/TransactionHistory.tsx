
import { User } from "@repo/db";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";

interface p2ptransaction {
  timestamp: Date;
  sender: User;
  reciever: User;
  amount: number;
}

interface TransactionHistoryProps {
  history: p2ptransaction[];
}

const TransactionHistory = async ({ history }: TransactionHistoryProps) => {
    const session = await  getServerSession(authOptions)
    const userId = session?.user?.id
  if (!history.length) {
    return (
      <Card title="Transaction History">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 flex flex-col gap-2 ">
        {history.map((transaction) => (
          <div
            key={transaction.timestamp.toString()}
            className="flex justify-between items-center"
          >
            <div>
              <div
                className={`text-md `}
              >
                {transaction.sender.id === Number(userId) ? transaction.reciever.name : transaction.sender.name}
              </div>
              <div className="text-xs text-neutral-400">
                {transaction.timestamp.toDateString()}
              </div>
            </div>
            <div
              className={`flex flex-col justify-center ${transaction.sender.id === Number(userId) ? "text-red-500" : "text-green-600"} `}
            >
                {transaction.sender.id === Number(userId) ? `- Rs ${transaction.amount / 100}` : `+ Rs ${transaction.amount / 100}`}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionHistory;
