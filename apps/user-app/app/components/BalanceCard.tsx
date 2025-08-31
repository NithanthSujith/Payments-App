import { Card } from "@repo/ui/card";

interface BalanceCardProps {
  amount: number;
  locked: number;
}

const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  return (
    <Card title="Balance">
      <div className="flex flex-col gap-2 mt-3 px-2">
        <div className="flex justify-between border-b border-slate-300  pb-1 px-1">
          <div className="">Unlocked Balance</div>
          <div>{amount / 100}</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-1 px-1">
          <div className="">Total locked Balance</div>
          <div>{locked / 100}</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 pb-1 px-1">
          <div className="">Total Balance</div>
          <div>{(amount + locked) / 100}</div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
