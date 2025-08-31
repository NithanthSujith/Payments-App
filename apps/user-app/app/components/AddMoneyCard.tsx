"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/Select";
import TextInput from "@repo/ui/TextInput";
import { useEffect, useState } from "react";
import createOnRampTransaction from "../lib/actions/createOnRampTxns";

const SUPPORT_BANKS = [
  {
    name: "HDFC Bank",
    redirectURL: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectURL: "https://www.axisbank.com/",
  },
];

const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORT_BANKS[0]?.redirectURL);
  const [amount, setAmount] = useState(0)
  const [provider , setProvider] = useState(SUPPORT_BANKS[0]?.name || "")
  const handleAmount = (value : string)=>{
    setAmount(Number(value))
  }

  
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput label="Amount" placeholder="Amount" onChange={handleAmount} />
        <div className="pt-4 pb-2 text-left font-medium">Bank</div>
        <Select onSelect={(value)=>{
            setRedirectUrl(SUPPORT_BANKS.find(x => x.name === value)?.redirectURL || "")
            setProvider(SUPPORT_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORT_BANKS.map(x=>({
            key : x.name,
            value : x.name
        }))}/>
        <div className="flex justify-center pt-4">
            <Button onclick={async()=>{
                console.log("onramp")
                const {message}  = await createOnRampTransaction(amount*100, provider)
                console.log( message)
                window.location.href = redirectUrl || ""

            }} >
                Add Money
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
