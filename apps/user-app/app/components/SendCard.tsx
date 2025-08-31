"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Center from "@repo/ui/Center";
import TextInput from "@repo/ui/TextInput";
import React, { useState } from "react";
import p2pTransaction from "../lib/actions/p2pTransactions";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function clearInputs() {
    console.log("clearing input")
    setAmount("");
    setNumber("");
  }
  return (
    <div>
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            label="Number"
            placeholder="Number"
            onChange={(value) => {
              setNumber(value);
            }}
            value={number}
          />
          <TextInput
            label="Amount"
            placeholder="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
            value={amount}
          />
          <div className="pt-4 flex justify-center">
            <Button
              onclick={async () => {
                setIsLoading(true);
                await p2pTransaction(number, Number(amount) * 100);
                clearInputs()
                setIsLoading(false);
              }}
            >
              {isLoading ? "....." : "Send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SendCard;
